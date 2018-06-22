require 'httparty'
require 'time'


class MattermostApi
	include HTTParty

	format :json
	# debug_output $stdout
	
	def initialize(mattermost_url, login_id, password)
		@base_uri = mattermost_url + 'api/v4/'
		@login_id = login_id
		@password = password

		@options = {
			headers: {
				'Content-Type' => 'application/json',
				'User-Agent' => 'Mattermost-HTTParty'
			},
			# TODO Make this more secure
			verify: false
		}
		
		login_options = @options
		login_options[:headers]['Content-Type' => 'application/x-www-form-urlencoded']
		login_options[:body] = {'login_id' => @login_id, 'password' => @password}.to_json

		token = self.class.post("#{@base_uri}users/login", login_options).headers['Token']

		@options[:headers]['Authorization'] = "Bearer #{token}"
		@options[:body] = nil
	end

	def test_api
		JSON.parse(self.class.get("#{@base_uri}users/me", @options).to_s)
	end

	def get_incident_channel_id(incident, team_name)
		team_id = self.get_team_by_name(team_name)
		
		channel_name = self.make_channel_name(incident)
		
		if self.channel_exists?(channel_name, team_id)
			channel_id = get_channel_id(channel_name, team_id)
		else
			channel_id = create_channel(incident, team_id)
		end

		return channel_id
	end

	def get_team_by_name(team_name)
		self.class.get("#{@base_uri}teams/name/#{team_name}", @options)['id']
	end

	def channel_exists?(channel_name, team_id)
		return !get_channel_id(channel_name, team_id).nil?
	end

	def get_channel_id(channel_name, team_id)
		channel = self.class.get("#{@base_uri}teams/#{team_id}/channels/name/#{channel_name}", @options)

		if !channel['name'].nil? and channel['name'] == channel_name
			return channel['id']
		else
			return nil
		end
	end

	def create_channel(incident, team_id)
		data = {name: self.make_channel_name(incident),
				display_name: "Incident #{incident['id']}",
				team_id: team_id,
				type: 'P'}.to_json

		options = @options
		options[:body] = data

		channel = self.class.post("#{@base_uri}channels", options)

		return channel['id']
	end

	def get_user_from_username(username)
		self.class.get("#{@base_uri}users/username/#{username}", @options)
	end

	def add_user_to_channel(username, channel_id)
		user_id = self.get_user_from_username(username)['id']

		options = @options
		options[:body] = {user_id: user_id}.to_json

		self.class.post("#{@base_uri}channels/#{channel_id}/members", options)
	end

	def make_channel_name(incident)
		"incident-#{incident['id'].downcase}"
	end

	def update_incident_header(incident)
		channel_name = self.make_channel_name(incident)

		incident_data = {
			incident_id: incident['id'],
			incident_url: incident['html_url'],
			incident_summary: incident['summary'],
			incident_status: incident['status'].capitalize,
			creation_date: incident['created_at'],
			last_update: incident['last_status_change_at']
		}

		header_format = File.read('post_formats/header_format.md')

		header_content = header_format % incident_data


		channel_id = self.get_incident_channel_id(incident, 'a-team') #TODO: Pull this from config

		options = @options
		options[:body] = {id: channel_id, header: header_content }.to_json
		
		self.class.put("#{@base_uri}channels/#{channel_id}", options)
	end

	def remove_user_from_channel(username, channel_id)
		user_id = self.get_user_from_username(username)['id']

		options = @options
		options[:body] = {user_id: user_id, channel_id: channel_id}.to_json

		self.class.delete("#{@base_uri}channels/#{channel_id}/members/#{user_id}", options)
	end

	def add_post(channel, message)
		team_id = team_id = self.get_team_by_name('a-team')
		channel_id = self.get_channel_id('town-square', team_id)

		options = @options
		options[:body] = {channel_id: channel_id, message: message}.to_json

		self.class.post("#{@base_uri}posts", options)
	end

	def post_resolution_statistics(incident)
		post_format = File.read('post_formats/resolution_stats_format.md')

		# Resolution time is incident['last_status_change_at'] incident['created_at']
		change_t = Time.parse(incident['last_status_change_at'])
		create_t = Time.parse(incident['created_at'])

		diff = change_t - create_t

		resolution_time = formatted_duration(diff.to_i)

		post_data = {
			incident_id: incident['id'],
			incident_url: incident['html_url'],
			resolution_time: resolution_time,
			resolve_reason: incident['resolve_reason']
		}

		post_message = post_format % post_data

		add_post('town-square', post_message)
	end

	# Thanks redbar0n! - https://gist.github.com/shunchu/3175001#gistcomment-2197179
	def formatted_duration(total_seconds)
		days = total_seconds / (60 * 60 * 24)
		hours = total_seconds / (60 * 60)
		minutes = (total_seconds / 60) % 60
		seconds = total_seconds % 60
		[days, hours, minutes, seconds].map do |t|
			t.round.to_s.rjust(2,'0')
	  	end.join(':')
	end
end