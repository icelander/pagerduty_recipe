{
  "messages": [
    {
      "created_on": "2018-06-14T18:58:10Z",
      "event": "incident.resolve",
      "id": "e28fb8d0-7004-11e8-88c8-0249c42ac030",
      "incident": {
        "acknowledgements": [],
        "alert_counts": {
          "all": 0,
          "resolved": 0,
          "triggered": 0
        },
        "alert_grouping": null,
        "assignments": [
          {
            "assignee": {
              "html_url": "https://mattermost-recipes.pagerduty.com/users/PLA5PA8",
              "id": "PLA5PA8",
              "self": "https://api.pagerduty.com/users/PLA5PA8",
              "summary": "Alice Evans",
              "type": "user_reference"
            },
            "at": "2018-06-14T17:58:12Z"
          }
        ],
        "basic_alert_grouping": null,
        "created_at": "2018-06-14T17:58:12Z",
        "description": "Test",
        "escalation_policy": {
          "html_url": "https://mattermost-recipes.pagerduty.com/escalation_policies/P9NEGDF",
          "id": "P9NEGDF",
          "self": "https://api.pagerduty.com/escalation_policies/P9NEGDF",
          "summary": "Default",
          "type": "escalation_policy_reference"
        },
        "external_references": [],
        "first_trigger_log_entry": {
          "html_url": "https://mattermost-recipes.pagerduty.com/incidents/P663HSE/log_entries/R2KSU3K4HIMKWVHB6YRQN610Z9",
          "id": "R2KSU3K4HIMKWVHB6YRQN610Z9",
          "self": "https://api.pagerduty.com/log_entries/R2KSU3K4HIMKWVHB6YRQN610Z9",
          "summary": "Triggered through the website",
          "type": "trigger_log_entry_reference"
        },
        "html_url": "https://mattermost-recipes.pagerduty.com/incidents/P663HSE",
        "id": "P663HSE",
        "impacted_services": [
          {
            "html_url": "https://mattermost-recipes.pagerduty.com/services/PG2S9BT",
            "id": "PG2S9BT",
            "self": "https://api.pagerduty.com/services/PG2S9BT",
            "summary": "UptimeRobot Service",
            "type": "service_reference"
          }
        ],
        "incident_key": "603b2c21fbc34f6bbca7b8ba98c7e6b2",
        "incident_number": 1,
        "incidents_responders": [],
        "is_mergeable": true,
        "last_status_change_at": "2018-06-14T18:58:10Z",
        "last_status_change_by": {
          "html_url": "https://mattermost-recipes.pagerduty.com/users/PLA5PA8",
          "id": "PLA5PA8",
          "self": "https://api.pagerduty.com/users/PLA5PA8",
          "summary": "Alice Evans",
          "type": "user_reference"
        },
        "metadata": {},
        "pending_actions": [],
        "privilege": null,
        "resolve_reason": "Test alert, please disregard",
        "responder_requests": [],
        "self": "https://api.pagerduty.com/incidents/P663HSE",
        "service": {
          "acknowledgement_timeout": null,
          "addons": [],
          "alert_creation": "create_alerts_and_incidents",
          "alert_grouping": null,
          "alert_grouping_timeout": null,
          "auto_resolve_timeout": null,
          "created_at": "2018-06-11T23:04:01Z",
          "description": "This service was created during onboarding on June 11, 2018.",
          "escalation_policy": {
            "html_url": "https://mattermost-recipes.pagerduty.com/escalation_policies/P9NEGDF",
            "id": "P9NEGDF",
            "self": "https://api.pagerduty.com/escalation_policies/P9NEGDF",
            "summary": "Default",
            "type": "escalation_policy_reference"
          },
          "html_url": "https://mattermost-recipes.pagerduty.com/services/PG2S9BT",
          "id": "PG2S9BT",
          "incident_urgency_rule": {
            "type": "constant",
            "urgency": "high"
          },
          "integrations": [],
          "last_incident_timestamp": "2018-06-14T17:58:12Z",
          "metadata": {},
          "name": "UptimeRobot Service",
          "privilege": null,
          "response_play": null,
          "scheduled_actions": [],
          "self": "https://api.pagerduty.com/services/PG2S9BT",
          "status": "active",
          "summary": "UptimeRobot Service",
          "support_hours": null,
          "teams": [],
          "type": "service"
        },
        "status": "resolved",
        "subscriber_requests": [],
        "summary": "[#1] Test",
        "teams": [],
        "title": "Test",
        "type": "incident",
        "urgency": "high"
      },
      "log_entries": [
        {
          "agent": {
            "html_url": "https://mattermost-recipes.pagerduty.com/users/PLA5PA8",
            "id": "PLA5PA8",
            "self": "https://api.pagerduty.com/users/PLA5PA8",
            "summary": "Alice Evans",
            "type": "user_reference"
          },
          "channel": {
            "type": "website"
          },
          "contexts": [],
          "created_at": "2018-06-14T18:58:10Z",
          "event_details": {},
          "html_url": null,
          "id": "R8MQ8MNPY20P1WK981R6CMDBFT",
          "incident": {
            "html_url": "https://mattermost-recipes.pagerduty.com/incidents/P663HSE",
            "id": "P663HSE",
            "self": "https://api.pagerduty.com/incidents/P663HSE",
            "summary": "[#1] Test",
            "type": "incident_reference"
          },
          "self": "https://api.pagerduty.com/log_entries/R8MQ8MNPY20P1WK981R6CMDBFT",
          "service": {
            "html_url": "https://mattermost-recipes.pagerduty.com/services/PG2S9BT",
            "id": "PG2S9BT",
            "self": "https://api.pagerduty.com/services/PG2S9BT",
            "summary": "UptimeRobot Service",
            "type": "service_reference"
          },
          "summary": "Resolved by Alice Evans",
          "teams": [],
          "type": "resolve_log_entry"
        }
      ],
      "webhook": {
        "accounts_addon": null,
        "config": {},
        "description": null,
        "endpoint_url": "http://movetoiceland.com:9000/hooks/pagerduty_hook",
        "html_url": null,
        "id": "PR9J5K9",
        "name": "Mattermost Webhook",
        "outbound_integration": {
          "html_url": null,
          "id": "PJFWPEP",
          "self": "https://api.pagerduty.com/outbound_integrations/PJFWPEP",
          "summary": "Generic V2 Webhook",
          "type": "outbound_integration_reference"
        },
        "self": "https://api.pagerduty.com/webhooks/PR9J5K9",
        "summary": "Mattermost Webhook",
        "type": "webhook",
        "webhook_object": {
          "html_url": "https://mattermost-recipes.pagerduty.com/services/PG2S9BT",
          "id": "PG2S9BT",
          "self": "https://api.pagerduty.com/services/PG2S9BT",
          "summary": "UptimeRobot Service",
          "type": "service_reference"
        }
      }
    }
  ]
}