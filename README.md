# bzmon

Quick and simple monitoring system written in NodeJS.
The agents and master both maintain a persistant connection through a Redis server.
The agents run a single local script on their node and report the result in json format to the Redis server.
The master instantly publishes the results to the web UI and Slack.

## Todo

1. Tolerate redis inavailability at startup and reconnect afterwards. Issue errors to log, but resume work once you find the redis.
2. Add HTML template for a dynamic table.
3. Add Slack notifications according to one of the agent tags (or simply look for the "environment" attribute. Each one should have it's own section in the configuration with the Slack webhook url and other data. It's a simple POST request. The request should have an "attachement" (red/green/orange bar on the left). [Here's how.](https://api.slack.com/docs/messages/builder?msg=%7B%22attachments%22%3A%5B%7B%22color%22%3A%22%2336a64f%22%2C%22text%22%3A%22And%20here%27s%20an%20attachment!%22%2C%22ts%22%3A1483878392%7D%5D%7D)
4. Notifications should be sent whenever a status changes to and from "OK". You may want to store a "current state" for that.
5. You can also consider the option to supress notifications according to conditions (user clicked "mute"/do not notify on staging at night/etc.)
