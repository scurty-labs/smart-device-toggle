# smart-device-toggle -
Toggle your TP-Link Smart compatible smart devices using the cinnamon panel applets.

# Install -
This applet requires `python`, and the `python-kasa` library.

`pip install python-kasa` should suffice.

Kasa is installed also located here: https://pypi.org/project/python-kasa/

Be sure it's installed at this location `~/.local/share/cinnamon/applets/smart-device-toggle@scurty-labs`

# Python Notes - 
Depending on the version of `python` you have installed and with environment control via `pyenv`, we've
added an option under the settings on each applet added to specify the python version that can be
changed. By default it will be `python`

# Discovering TP-Link Smart devices -
After installing, you can run an included python script. The following command below will try to find all the existing
smart devices connected to your local network. Copy the IP's to the applet config dialog under `Smart Device IP Address`

```python ~/.local/share/cinnamon/applets/smart-device-toggle@scurty-labs/device-interface.py```

