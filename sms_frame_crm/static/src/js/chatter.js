odoo.define('override_chatter.override_chatter', function (require) {
    "use strict";

    var core = require('web.core');
    var Chatter = require('mail.Chatter');
    var MailThread = core.form_widget_registry.get('mail_thread');
    var NewSMS = MailThread.include({
        init: function () {
            this._super.apply(this, arguments);
            this.events = _.extend(this.events, {
                "click .o_chatter_button_new_sms": "on_new_sms",
            });
        },

        on_new_sms: function () {
            var values = this.getParent().get_fields_values()
            this.do_action({
                type:'ir.actions.act_window',
                res_model:'sms.compose',
                views: [[false,'form']],
                target:'new',
                context: {
                    'default_field_id': this.name,
                    'default_to_number': values['mobile'],
                    'default_record_id': values['id'],
                    'default_model': this.getParent().model
                },
            });

        },

    });
});
