#!/usr/bin/ruby

require './mattermost_api.rb'

$config = YAML.load(
	File.open('conf.yaml').read
)

api = MattermostApi.new($config['mattermost_api']['url'],
						$config['mattermost_api']['login_id'],
						$config['mattermost_api']['password'])

if !ARGV[0].nil?
	messages = JSON.parse(ARGV[0])['messages']
else
	file = File.read('test_data/incident.resolve.js')
	messages = JSON.parse(file)['messages']
end


messages.each do |message|
	# pp message and abort
	case message['event']
	when 'incident.trigger'
		# Create incident channel
		channel_id = api.get_incident_channel_id(message['incident'], $config['notification_settings']['team_name'])

		# Add relevant users to incident channel
		$config['notification_settings']['alert_users'].each do |username|
			api.add_user_to_channel(username, channel_id)
		end

		# Post formatted incident info to channel header
		api.update_incident_header(message['incident'])
		

	when 'incident.resolve'
		api.update_incident_header(message['incident'])

		# Post resolution statistics to Town Hall
		api.post_resolution_statistics(message['incident'])

		# Get incident channel
		channel_id = api.get_incident_channel_id(message['incident'], $config['notification_settings']['team_name'])

		# Remove all users from channel
		$config['notification_settings']['alert_users'].each do |username|
			api.remove_user_from_channel(username, channel_id)
		end
	else
		# Just update the incident header
		api.update_incident_header(message['incident'])
	end
end