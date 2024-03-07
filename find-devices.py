import asyncio

from kasa import Discover, SmartBulb, SmartPlug

async def main():
    found_devices = await Discover.discover()
    print("Searching for devices...")
    for addr, device in found_devices.items():
        await device.update()
        print(device.alias + " --- " + addr)
    print("Finished.")
    


if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    asyncio.get_event_loop().run_until_complete(main())