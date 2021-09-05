import React from "react";
import { screen, render } from "@testing-library/react";
import renderer from "react-test-renderer";

import ListRocketLaunch from "./RocketLaunchDashboard";

jest.mock("../PlotLaunches/PlotLaunches", () => () => <></>);

jest.mock("../../hooks/useService", () => ({
  __esModule: true,
  default: () => ({
    state: 2,
    data: JSON.parse(`{
        "count": 1,
        "next": "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&offset=10",
        "previous": null,
        "results": [
            {
                "id": "0834f42e-8b04-4026-a3e1-df7a0d570bba",
                "url": "https://lldev.thespacedevs.com/2.2.0/launch/0834f42e-8b04-4026-a3e1-df7a0d570bba/",
                "slug": "soyuz-21bfregat-m-oneweb-10",
                "name": "Soyuz 2.1b/Fregat-M | OneWeb 10",
                "status": {
                    "id": 8,
                    "name": "To Be Confirmed",
                    "abbrev": "TBC",
                    "description": "Awaiting official confirmation - current date is known with some certainty."
                },
                "last_updated": "2021-08-22T13:23:59Z",
                "net": "2021-09-14T00:00:00Z",
                "window_end": "2021-09-14T00:00:00Z",
                "window_start": "2021-09-14T00:00:00Z",
                "probability": null,
                "holdreason": "",
                "failreason": "",
                "hashtag": null,
                "launch_service_provider": {
                    "id": 115,
                    "url": "https://lldev.thespacedevs.com/2.2.0/agencies/115/",
                    "name": "Arianespace",
                    "type": "Commercial"
                },
                "rocket": {
                    "id": 2856,
                    "configuration": {
                        "id": 134,
                        "url": "https://lldev.thespacedevs.com/2.2.0/config/launcher/134/",
                        "name": "Soyuz 2.1b/Fregat-M",
                        "family": "Soyuz",
                        "full_name": "Soyuz 2.1b Fregat-M",
                        "variant": "Fregat-M"
                    }
                },
                "mission": {
                    "id": 1270,
                    "name": "OneWeb 10",
                    "description": "A batch of 34 satellites for the OneWeb satellite constellation, which is intended to provide global Internet broadband service for individual consumers. The constellation is planned to have around 648 microsatellites (of which 60 are spares), around 150 kg each, operating in Ku-band from low Earth orbit.",
                    "launch_designator": null,
                    "type": "Communications",
                    "orbit": {
                        "id": 13,
                        "name": "Polar Orbit",
                        "abbrev": "PO"
                    }
                },
                "pad": {
                    "id": 20,
                    "url": "https://lldev.thespacedevs.com/2.2.0/pad/20/",
                    "agency_id": null,
                    "name": "31/6",
                    "info_url": null,
                    "wiki_url": "",
                    "map_url": "http://maps.google.com/maps?q=45.996+N,+63.564+E",
                    "latitude": "45.996034",
                    "longitude": "63.564003",
                    "location": {
                        "id": 15,
                        "url": "https://lldev.thespacedevs.com/2.2.0/location/15/",
                        "name": "Baikonur Cosmodrome, Republic of Kazakhstan",
                        "country_code": "KAZ",
                        "map_image": "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/location_15_20200803142517.jpg",
                        "total_launch_count": 1522,
                        "total_landing_count": 0
                    },
                    "map_image": "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/pad_20_20200803143516.jpg",
                    "total_launch_count": 393
                },
                "webcast_live": false,
                "image": "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/soyuz25202.1b_image_20210520085936.jpeg",
                "infographic": null,
                "program": []
            }
        ]
      }`),
  }),
}));

test("renders ListRocketLaunch", async () => {
  const tree = renderer.create(<ListRocketLaunch />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Check Launch Count", () => {
  render(<ListRocketLaunch />);
  const root = screen.getByTestId("totalLaunches");
  expect(root.innerHTML).toContain(1);
});

test("Previous button shoud be disabled", () => {
  render(<ListRocketLaunch />);
  const previous = screen.getByTestId("previous");
  expect(previous).not.toBeEnabled();
});

test("Next button shoud be enabled", () => {
  render(<ListRocketLaunch />);
  const next = screen.getByTestId("next");
  expect(next).toBeEnabled();
});
