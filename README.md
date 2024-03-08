# smart-device-toggle -
Toggle your TP-Link Smart compatible smart devices using the Cinnamon panel.

# Install -
This applet requires `Python`, and the `python-kasa` library.

Kasa is installed from here: https://pypi.org/project/python-kasa/

# Python Notes - 
Depending on the version of `Python` you have installed, we've
added an option under the settings on each applet added to specify
the python version that should be used. By default it will call
`python`

# Discovering TP-Link Smart devices -
After installing, you can run an included python script:
`python ~/.local/share/cinnamon/applets/smart-device-toggle@scurty-labs/device-interface.py`
This command will try to find all the existing smart devices connected to your local network. Copy
the IP's to the applet config dialog.
