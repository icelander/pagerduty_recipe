# Mattermost Recipe: Handling Incidents with Mattermost

## Problem
Many devops teams have incident alerting systems, but responding to the incident and getting a team together can take a while, and incident discussion can clutter up existing Mattermost channels. This is a simple recipe to help notify people that an incident occurred and keep discussion of the incident organized.

## Solution
This is a very specific solution that will create a channel and invite some people on an incident trigger, update the channel header when the incident status changes, and close the channel and  output resolution statistics to the Town Hall

*Note:* This code is mainly used to illustrate how to access the Mattermost API and connect it to a webhook, and should be considered a guide more than a production-ready application.

### 0. Set up a Mattermost Server

[Instructions are available here](https://docs.mattermost.com/guides/administrator.html#installing-mattermost)

### 1. Set up the code
The code for this is open source and available [here](). It includes a webhook configuration, a Ruby script called from the webhook, and a sample config file as well as a small Mattermost API library to handle talking to your Mattermost server.

To create your own config files, make a copy of `sample.hooks.json` and rename it to `hooks.json`. Then edit the `execute-command` and `command-working-directory` to use the correct path.

Next, make a copy of `sample.conf.yaml` and rename it `conf.yaml`. Then edit the configuration to authenticate to your Mattermost server, and specify the team name and users who should be notified.

Finally, make sure you have [webhook](https://github.com/adnanh/webhook) installed and run `webhook -verbose` to start listening for the notifications.

To test that the webhook is working correctly, run this command from inside the PagerDuty Recipe directory:

```
$ curl -vX POST http://127.0.0.1:9000/hooks/pagerduty_hook -d @./test_data/incident.trigger.js --header "Content-Type: application/json"
```

Change `trigger` to either `acknowledge` or `resolve` to use those incident states.

### 2. Configure PagerDuty Webhook Settings
PagerDuty is a widely used alerting system, but  any system that can send an outgoing webhook when an event is triggered could be used as a replacement.

Outgoing webhooks in PagerDuty are linked to monitoring services, but first you need to add it as an extension to that service. To get to them, go to `Configuration`>`Services`. 

![PagerDuty - Configuration -> Services][config_services]

Then click the service name and click the `Integrations` tab and click `New Extension` and enter a name for your webhook and the URL to call, which should end with `pagerduty_hook` to match the `hooks.json` file

![PagerDuty - New Extension][new_extension]

### Test it out
Next, trigger an alert in PagerDuty and acknowledge and resolve it. When the issue is created you’ll see a private channel created for the incident, with a header that shows the status of the ticket:

![Mattermost - New Incident Channel Created][incident_trigger]

When the ticket status is updated, like with an acknowledgement, it updates the channel header to indicate the new status:

![Mattermost - Channel Header Changed][incident_acknowledge]

And when the issue is resolved, users are disinvited from the channel and the resolution is posted in Town Hall with some information, to let the whole team know the problem is fixed:

![Mattermost - Resolution Statistics Posted][incident_resolve]

## Discussion
This recipe just shows a couple ways you can use a webhook and Mattermost to improve incident notification and organization. For example, on resolution of a ticket a script could get all the posts in the incident channel, as well as any files that were uploaded, and put them in an archive that’s attached to the incident resolution.

Because Mattermost supports [interactive message buttons](https://docs.mattermost.com/developer/interactive-message-buttons.html)  and [slash commands](https://docs.mattermost.com/developer/slash-commands.html) you can also send hooks out of Mattermost. PagerDuty incidents could be acknowledged or a Jira ticket with the relevant incident information can be created without leaving your Mattermost client.

PagerDuty also supports other event types that you may want to handle differently, such as adding users to the incident channel when an incident is assigned to them.

## Resources
Here’s where you can find everything you need to write your own Mattermost incident management system, based on PagerDuty:

* [PagerDuty Webhooks](https://support.pagerduty.com/docs/webhooks)
* [Mattermost API](https://api.mattermost.com/)
* [webhook](https://github.com/adnanh/webhook)
* [HTTParty](https://github.com/jnunemaker/httparty)

[config_services]: https://imgur.com/59n512d.png
[new_extension]: https://imgur.com/B5APu5C.png
[incident_trigger]: https://imgur.com/LiLYxXu.png
[incident_acknowledge]: https://imgur.com/o5yoffA.png
[incident_resolve]: https://imgur.com/CUvhOBo.png