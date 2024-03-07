const Applet = imports.ui.applet;
const Util = imports.misc.util;
const Lang = imports.lang;
const Mainloop = imports.mainloop;
const Settings = imports.ui.settings;

const UUID = "smart-device-toggle@scurty-labs";
const APPLET_PATH = imports.ui.appletManager.appletMeta["smart-device-toggle@scurty-labs"].path;

function LightOffApplet(orientation, panel_height, instance_id) {
    this._init(orientation, panel_height, instance_id);
}

LightOffApplet.prototype = {
    __proto__: Applet.TextIconApplet.prototype,

    _init: function(orientation, panel_height, instance_id) {
        Applet.TextIconApplet.prototype._init.call(this, orientation, panel_height, instance_id);

        this.device_script = "device-interface.py";

        this.switch_name = "Device";
        this.switch_ip = "";
        this.python_bin = "python3";

        this.on_icon = "flashlight-on";
        this.off_icon = "flashlight-off";

        // Bind settings for `metadata.json`
        this.settings = new Settings.AppletSettings(this, UUID, this.instance_id);
        this.settings.bindProperty(Settings.BindingDirection.IN, "switch-name", "switch_name", this.on_settings_changed, null);
        this.settings.bindProperty(Settings.BindingDirection.IN, "switch-ip", "switch_ip", this.on_settings_changed, null);
        this.settings.bindProperty(Settings.BindingDirection.IN, "python-bin", "python_bin", this.on_settings_changed, null);
        this.settings.bindProperty(Settings.BindingDirection.IN, "on-icon", "on_icon", this.on_settings_changed, null);
        this.settings.bindProperty(Settings.BindingDirection.IN, "off-icon", "off_icon", this.on_settings_changed, null);
        
        this.set_applet_icon_name(this.on_icon);
        this.set_applet_tooltip("Toggle %s".format(this.switch_name));

        // Sync the current state of the smart light (true/false on/off)
        this.on_get_state();

        // Start state sync loop
        this._update_loop();

    },
    on_toggle: function() {
        Util.spawn_async([this.python_bin, APPLET_PATH+'/'+this.device_script, this.switch_ip, '--toggle'], Lang.bind(this,function(response) {
            let output = response.trim()
            if(output === "True") {
                this.set_applet_icon_name(this.on_icon);
            }else if (output === "False") {
                this.set_applet_icon_name(this.off_icon);
            }
        }));
    },
    on_get_state: function() {
        Util.spawn_async([this.python_bin, APPLET_PATH+'/'+this.device_script, this.switch_ip, '--state'], Lang.bind(this,function(response) {
            let output = response.trim()
            if(output === "True") {
                this.set_applet_icon_name(this.on_icon);
            }else if (output === "False") {
                this.set_applet_icon_name(this.off_icon);
            }
        }));
    },
    on_applet_clicked: function() {
        this.on_toggle();
    },
    on_applet_removed_from_panel: function () {
         // Stop Mainloop
        if (this._updateLoopID) {
            Mainloop.source_remove(this._updateLoopID);
        }
        this.settings.finalize();
    },
    _update_loop: function () {
        this.on_get_state();
        this._updateLoopID = Mainloop.timeout_add(5000, Lang.bind(this, this._update_loop));
     },
    on_settings_changed: function () {
        this.set_applet_tooltip("Toggle %s".format(this.switch_name));
    }
};

function main(metadata, orientation, panel_height, instance_id) {
    return new LightOffApplet(orientation, panel_height, instance_id);
}