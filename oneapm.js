/**
 * OneAPM agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name : ['exampleApp'],
  /**
   * Your OneAPM license key.
   */
  license_key : 'BghVAw0GXVM30f1HSV1GDQ8aX096eaZcCh0LBlRUH0e33VUKHlNUGgMCac61AVMcCQ9IUQM=',
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to OneAPM when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'info'
  },
  transaction_events: {
        enabled: true
  }
};
