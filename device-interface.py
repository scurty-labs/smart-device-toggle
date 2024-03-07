import sys
import asyncio

# Be sure to install `kasa` with `pip3 install python-kasa` system wide
from kasa import Discover, SmartBulb, SmartPlug

async def main():

    # TODO: Must make this more streamlined and less error prone.

    # Check min arguments...
    if 3 < len(sys.argv):
        print("Device interface arguments are invalid. 'device-interface.py <ip> --state /--toggle'")
    else:
        switch_ip = sys.argv[1] # An IP Address
        light = SmartPlug(switch_ip) # Create SmartPlug instance

        await light.update() # Be sure to get the current devices state/metadata beforehand

        # Determine state of arguments for commandline
        if sys.argv[2] == "--state": # To request the current (on/off) state of the smart device
            print(light.is_on)
        elif sys.argv[2] == "--toggle": # To *toggle* the current (on/off) state of the smart device
            print(light.is_off)
            if light.is_on:
                await light.turn_off()
            else:
                await light.turn_on()


if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    asyncio.get_event_loop().run_until_complete(main())
