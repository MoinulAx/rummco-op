import type { Building } from "@/lib/buildings";

/**
 * DEV-ONLY FIXTURE. Not real DHCR data.
 *
 * 340 synthetic rows, generated once and frozen here, used only by the mock
 * adapter when NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are
 * unset. Addresses, BBLs, block/lot and coordinates are invented; coordinates
 * are jittered around real neighbourhood centroids so the map clusters the way
 * the real one does. Nothing here should ever be presented as a registration.
 *
 * The real dataset is roughly 50,879 buildings and lives in Postgres. It is
 * never bundled: see lib/data/supabase-adapter.ts.
 *
 * Coverage: MANHATTAN 79, BRONX 79, BROOKLYN 103, QUEENS 61, STATEN ISLAND 18;
 * 41 approximate rows, 55 with a secondary address, 19 of the 19 status codes.
 */
export const MOCK_BUILDINGS: Building[] = [
  {
    id: "82354bca-1048-46f6-93cc-2446baa9937b",
    bbl: "1004330023",
    borough: "MANHATTAN",
    zip: "10025",
    house_number_raw: "365",
    house_number_low: 365,
    house_number_high: 365,
    street: "AMSTERDAM",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "433",
    lot: "23",
    lat: 40.791747,
    lng: -73.980184,
    geocode_quality: "exact"
  },
  {
    id: "498d4d8d-2900-4393-9f8f-2db018259f60",
    bbl: "1004830371",
    borough: "MANHATTAN",
    zip: "10034",
    house_number_raw: "183",
    house_number_low: 183,
    house_number_high: 183,
    street: "SHERMAN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "SEC 608"
    ],
    block: "483",
    lot: "371",
    lat: 40.87568,
    lng: -73.931402,
    geocode_quality: "approximate"
  },
  {
    id: "ab40c2c9-2f71-4a35-be1b-2e0a64d8b969",
    bbl: "1005800016",
    borough: "MANHATTAN",
    zip: "10033",
    house_number_raw: "161",
    house_number_low: 161,
    house_number_high: 161,
    street: "AUDUBON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "COOP/CONDO PLAN FILE"
    ],
    block: "580",
    lot: "16",
    lat: 40.841586,
    lng: -73.941995,
    geocode_quality: "exact"
  },
  {
    id: "4e96ad50-58a0-4e97-a64d-8e2f67603a95",
    bbl: "1006920447",
    borough: "MANHATTAN",
    zip: "10001",
    house_number_raw: "514",
    house_number_low: 514,
    house_number_high: 514,
    street: "W 23",
    street_suffix: "STREET",
    secondary_address: "231 W 18 STREET",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "692",
    lot: "447",
    lat: 40.748864,
    lng: -73.999722,
    geocode_quality: "exact"
  },
  {
    id: "930d0744-1802-44f3-94aa-f3a958e1ae83",
    bbl: "1007910142",
    borough: "MANHATTAN",
    zip: "10033",
    house_number_raw: "368",
    house_number_low: 368,
    house_number_high: 368,
    street: "AUDUBON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "791",
    lot: "142",
    lat: 40.836967,
    lng: -73.943847,
    geocode_quality: "exact"
  },
  {
    id: "719e74c1-fd88-4740-bd37-83c55e7e19f6",
    bbl: "1008470456",
    borough: "MANHATTAN",
    zip: "10034",
    house_number_raw: "489",
    house_number_low: 489,
    house_number_high: 489,
    street: "POST",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "847",
    lot: "456",
    lat: 40.869373,
    lng: -73.916429,
    geocode_quality: "exact"
  },
  {
    id: "9d652686-dfdf-42fa-98f5-8195243608d5",
    bbl: "1008750120",
    borough: "MANHATTAN",
    zip: "10032",
    house_number_raw: "365",
    house_number_low: 365,
    house_number_high: 365,
    street: "W 181",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "875",
    lot: "120",
    lat: 40.84561,
    lng: -73.934918,
    geocode_quality: "exact"
  },
  {
    id: "a5e1c112-c6bb-415b-85bd-d52976988b1e",
    bbl: "1010750166",
    borough: "MANHATTAN",
    zip: "10035",
    house_number_raw: "108",
    house_number_low: 108,
    house_number_high: 108,
    street: "E 103",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "421-A (16)",
      "J-51"
    ],
    block: "1075",
    lot: "166",
    lat: 40.800645,
    lng: -73.937262,
    geocode_quality: "exact"
  },
  {
    id: "cb5931d7-757e-4f14-a604-62ed8b52c5f2",
    bbl: "1013260291",
    borough: "MANHATTAN",
    zip: "10029",
    house_number_raw: "235",
    house_number_low: 235,
    house_number_high: 235,
    street: "E 116",
    street_suffix: "STREET",
    secondary_address: "355 E 118 STREET",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1326",
    lot: "291",
    lat: 40.796597,
    lng: -73.932068,
    geocode_quality: "exact"
  },
  {
    id: "a9054adc-004e-440b-9249-a70c572f398f",
    bbl: "1014130438",
    borough: "MANHATTAN",
    zip: "10025",
    house_number_raw: "11",
    house_number_low: 11,
    house_number_high: 11,
    street: "W 106",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1413",
    lot: "438",
    lat: 40.785648,
    lng: -73.976078,
    geocode_quality: "exact"
  },
  {
    id: "83e632d7-1f8e-4266-9a57-642557bd67f3",
    bbl: "1017070072",
    borough: "MANHATTAN",
    zip: "10011",
    house_number_raw: "45",
    house_number_low: 45,
    house_number_high: 45,
    street: "W 18",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1707",
    lot: "72",
    lat: 40.754378,
    lng: -74.005427,
    geocode_quality: "approximate"
  },
  {
    id: "c8e43fab-138f-4ec9-8546-7608150b8b39",
    bbl: "1017740339",
    borough: "MANHATTAN",
    zip: "10002",
    house_number_raw: "600",
    house_number_low: 600,
    house_number_high: 600,
    street: "RIVINGTON",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1774",
    lot: "339",
    lat: 40.719883,
    lng: -73.988005,
    geocode_quality: "exact"
  },
  {
    id: "6bb851dd-ba71-4868-9eb8-290b8a9f7e6c",
    bbl: "1018850357",
    borough: "MANHATTAN",
    zip: "10001",
    house_number_raw: "446",
    house_number_low: 446,
    house_number_high: 446,
    street: "W 18",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1885",
    lot: "357",
    lat: 40.747165,
    lng: -74.002209,
    geocode_quality: "exact"
  },
  {
    id: "c5eee1ab-9dbc-481b-b2a9-1c031dfb77f3",
    bbl: "1019610471",
    borough: "MANHATTAN",
    zip: "10027",
    house_number_raw: "293",
    house_number_low: 293,
    house_number_high: 293,
    street: "FREDERICK DOUGLASS",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1961",
    lot: "471",
    lat: 40.803307,
    lng: -73.951825,
    geocode_quality: "approximate"
  },
  {
    id: "99ca620c-6500-4f48-a6c3-1d500c2c04da",
    bbl: "1020070343",
    borough: "MANHATTAN",
    zip: "10032",
    house_number_raw: "470",
    house_number_low: 470,
    house_number_high: 470,
    street: "AUDUBON",
    street_suffix: "AVENUE",
    secondary_address: "118 AUDUBON AVENUE",
    statuses: [
      "421-A (16)"
    ],
    block: "2007",
    lot: "343",
    lat: 40.843537,
    lng: -73.945923,
    geocode_quality: "exact"
  },
  {
    id: "fc576a93-6d62-4810-9280-22a8f2cc31a5",
    bbl: "1020900288",
    borough: "MANHATTAN",
    zip: "10027",
    house_number_raw: "465-467",
    house_number_low: 465,
    house_number_high: 467,
    street: "W 145",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "SEC 608"
    ],
    block: "2090",
    lot: "288",
    lat: 40.81211,
    lng: -73.940202,
    geocode_quality: "exact"
  },
  {
    id: "ca758a1b-4be1-461e-88f3-bfd3b0a40165",
    bbl: "1021260439",
    borough: "MANHATTAN",
    zip: "10002",
    house_number_raw: "227",
    house_number_low: 227,
    house_number_high: 227,
    street: "LUDLOW",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2126",
    lot: "439",
    lat: 40.711178,
    lng: -73.980432,
    geocode_quality: "exact"
  },
  {
    id: "f0c32af9-456d-48ee-9317-9982ff45fa8a",
    bbl: "1021360375",
    borough: "MANHATTAN",
    zip: "10009",
    house_number_raw: "523-525",
    house_number_low: 523,
    house_number_high: 525,
    street: "AVENUE B",
    street_suffix: null,
    secondary_address: "174 DELANCEY STREET",
    statuses: [
      "GARDEN COMPLEX"
    ],
    block: "2136",
    lot: "375",
    lat: 40.722744,
    lng: -73.973541,
    geocode_quality: "approximate"
  },
  {
    id: "641bc2a7-fb34-447c-a354-b046dfc541c2",
    bbl: "1021750120",
    borough: "MANHATTAN",
    zip: "10001",
    house_number_raw: "87",
    house_number_low: 87,
    house_number_high: 87,
    street: "W 18",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2175",
    lot: "120",
    lat: 40.738576,
    lng: -74.005435,
    geocode_quality: "approximate"
  },
  {
    id: "a6a8eb33-db7b-4c92-b419-b50a8b61ed51",
    bbl: "1025260094",
    borough: "MANHATTAN",
    zip: "10009",
    house_number_raw: "68",
    house_number_low: 68,
    house_number_high: 68,
    street: "RIVINGTON",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2526",
    lot: "94",
    lat: 40.715326,
    lng: -73.981084,
    geocode_quality: "exact"
  },
  {
    id: "5616ae10-14fd-4a2b-ab7a-d6cc58268dd6",
    bbl: "1027570202",
    borough: "MANHATTAN",
    zip: "10035",
    house_number_raw: "219",
    house_number_low: 219,
    house_number_high: 219,
    street: "E 118",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "421-A (16)"
    ],
    block: "2757",
    lot: "202",
    lat: 40.80097,
    lng: -73.945115,
    geocode_quality: "approximate"
  },
  {
    id: "67909c2a-1ba5-4fdd-bf30-7166566b4e62",
    bbl: "1027680264",
    borough: "MANHATTAN",
    zip: "10024",
    house_number_raw: "44-52",
    house_number_low: 44,
    house_number_high: 52,
    street: "W 94",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "ART V"
    ],
    block: "2768",
    lot: "264",
    lat: 40.79017,
    lng: -73.980265,
    geocode_quality: "exact"
  },
  {
    id: "d8c5260c-ef87-422d-b401-4f1b25b31ef6",
    bbl: "1028780318",
    borough: "MANHATTAN",
    zip: "10032",
    house_number_raw: "512-520",
    house_number_low: 512,
    house_number_high: 520,
    street: "W 181",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "NON-EVICT COOP/CONDO"
    ],
    block: "2878",
    lot: "318",
    lat: 40.837316,
    lng: -73.934398,
    geocode_quality: "exact"
  },
  {
    id: "41d9a997-be4e-449b-a0fa-133d6167649d",
    bbl: "1029610424",
    borough: "MANHATTAN",
    zip: "10001",
    house_number_raw: "191",
    house_number_low: 191,
    house_number_high: 191,
    street: "8",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "ROOMING HOUSE"
    ],
    block: "2961",
    lot: "424",
    lat: 40.745052,
    lng: -73.992209,
    geocode_quality: "exact"
  },
  {
    id: "0a0b5008-30d1-4e17-9203-1724a8b367c2",
    bbl: "1029980001",
    borough: "MANHATTAN",
    zip: "10023",
    house_number_raw: "325-333",
    house_number_low: 325,
    house_number_high: 333,
    street: "AMSTERDAM",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "EVICT COOP/CONDO",
      "NON-EVICT COOP/CONDO"
    ],
    block: "2998",
    lot: "1",
    lat: 40.788365,
    lng: -73.975086,
    geocode_quality: "exact"
  },
  {
    id: "fcd2e8a1-c352-4536-a274-9a5d19b5f80b",
    bbl: "1029980206",
    borough: "MANHATTAN",
    zip: "10025",
    house_number_raw: "262",
    house_number_low: 262,
    house_number_high: 262,
    street: "AMSTERDAM",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2998",
    lot: "206",
    lat: 40.783647,
    lng: -73.970293,
    geocode_quality: "exact"
  },
  {
    id: "66683ae3-309d-4675-b5f6-43cda228fb34",
    bbl: "1031980265",
    borough: "MANHATTAN",
    zip: "10035",
    house_number_raw: "261",
    house_number_low: 261,
    house_number_high: 261,
    street: "E 116",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "J-51",
      "MULTIPLE DWELLING A"
    ],
    block: "3198",
    lot: "265",
    lat: 40.791406,
    lng: -73.938344,
    geocode_quality: "exact"
  },
  {
    id: "59a0ba2b-db6d-4f99-8e92-b0e6f376c83c",
    bbl: "1032320424",
    borough: "MANHATTAN",
    zip: "10030",
    house_number_raw: "634",
    house_number_low: 634,
    house_number_high: 634,
    street: "LENOX",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "3232",
    lot: "424",
    lat: 40.818987,
    lng: -73.951065,
    geocode_quality: "approximate"
  },
  {
    id: "4ad148d4-a41a-438c-afa7-e623085c9660",
    bbl: "1033530219",
    borough: "MANHATTAN",
    zip: "10025",
    house_number_raw: "424",
    house_number_low: 424,
    house_number_high: 424,
    street: "W 106",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "EVICT COOP/CONDO"
    ],
    block: "3353",
    lot: "219",
    lat: 40.782483,
    lng: -73.968388,
    geocode_quality: "exact"
  },
  {
    id: "136becca-5ebc-4fdf-b093-f4373ebedb7a",
    bbl: "1034540428",
    borough: "MANHATTAN",
    zip: "10034",
    house_number_raw: "497",
    house_number_low: 497,
    house_number_high: 497,
    street: "W 207",
    street_suffix: "STREET",
    secondary_address: "327 SHERMAN AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3454",
    lot: "428",
    lat: 40.863011,
    lng: -73.920084,
    geocode_quality: "exact"
  },
  {
    id: "3602d7b5-1fb5-462f-92cd-bf7a0d29f691",
    bbl: "1036210187",
    borough: "MANHATTAN",
    zip: "10033",
    house_number_raw: "361-363",
    house_number_low: 361,
    house_number_high: 363,
    street: "W 181",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3621",
    lot: "187",
    lat: 40.845142,
    lng: -73.945978,
    geocode_quality: "exact"
  },
  {
    id: "5408e71c-0c91-4e4f-834b-6417adc4c0d4",
    bbl: "1036280046",
    borough: "MANHATTAN",
    zip: "10032",
    house_number_raw: "216",
    house_number_low: 216,
    house_number_high: 216,
    street: "AUDUBON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "GARDEN COMPLEX"
    ],
    block: "3628",
    lot: "46",
    lat: 40.840706,
    lng: -73.943389,
    geocode_quality: "exact"
  },
  {
    id: "9db895b8-3f17-481b-bf3b-14ab5e6f2ab6",
    bbl: "1037890192",
    borough: "MANHATTAN",
    zip: "10033",
    house_number_raw: "446",
    house_number_low: 446,
    house_number_high: 446,
    street: "ST NICHOLAS",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING B"
    ],
    block: "3789",
    lot: "192",
    lat: 40.845726,
    lng: -73.935312,
    geocode_quality: "exact"
  },
  {
    id: "6be6db66-8777-46fe-b482-61c92ab9d2e7",
    bbl: "1038770429",
    borough: "MANHATTAN",
    zip: "10027",
    house_number_raw: "559",
    house_number_low: 559,
    house_number_high: 559,
    street: "ADAM C POWELL",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3877",
    lot: "429",
    lat: 40.815848,
    lng: -73.951565,
    geocode_quality: "exact"
  },
  {
    id: "45c5097f-612b-4d76-b510-f3ba6ffabdd9",
    bbl: "1038900236",
    borough: "MANHATTAN",
    zip: "10029",
    house_number_raw: "276-280",
    house_number_low: 276,
    house_number_high: 280,
    street: "LEXINGTON",
    street_suffix: "AVENUE",
    secondary_address: "140 LEXINGTON AVENUE",
    statuses: [
      "421-A (16)"
    ],
    block: "3890",
    lot: "236",
    lat: 40.793245,
    lng: -73.943083,
    geocode_quality: "exact"
  },
  {
    id: "e4a72d37-f87d-44ac-bcec-7b41a9a53ae8",
    bbl: "1039380243",
    borough: "MANHATTAN",
    zip: "10034",
    house_number_raw: "597-605",
    house_number_low: 597,
    house_number_high: 605,
    street: "POST",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3938",
    lot: "243",
    lat: 40.859089,
    lng: -73.92207,
    geocode_quality: "approximate"
  },
  {
    id: "df602efa-75b0-4c9b-857a-cb41d41d654e",
    bbl: "1039940356",
    borough: "MANHATTAN",
    zip: "10011",
    house_number_raw: "243",
    house_number_low: 243,
    house_number_high: 243,
    street: "W 29",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3994",
    lot: "356",
    lat: 40.749615,
    lng: -73.99097,
    geocode_quality: "exact"
  },
  {
    id: "a6f0017b-8610-48c1-ab5d-f836235b7fc9",
    bbl: "1043950001",
    borough: "MANHATTAN",
    zip: "10024",
    house_number_raw: "602",
    house_number_low: 602,
    house_number_high: 602,
    street: "BROADWAY",
    street_suffix: null,
    secondary_address: "112 AMSTERDAM AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "4395",
    lot: "1",
    lat: 40.786636,
    lng: -73.974851,
    geocode_quality: "exact"
  },
  {
    id: "515c88c5-9d19-431c-8d26-c6a4c58dd263",
    bbl: "1046550251",
    borough: "MANHATTAN",
    zip: "10035",
    house_number_raw: "244",
    house_number_low: 244,
    house_number_high: 244,
    street: "LEXINGTON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (1-15)",
      "J-51"
    ],
    block: "4655",
    lot: "251",
    lat: 40.796157,
    lng: -73.9366,
    geocode_quality: "exact"
  },
  {
    id: "cb54dc09-274f-4244-afb0-9398f1477a5d",
    bbl: "1048540086",
    borough: "MANHATTAN",
    zip: "10024",
    house_number_raw: "629-635",
    house_number_low: 629,
    house_number_high: 635,
    street: "BROADWAY",
    street_suffix: null,
    secondary_address: null,
    statuses: [
      "HPD"
    ],
    block: "4854",
    lot: "86",
    lat: 40.78496,
    lng: -73.978718,
    geocode_quality: "exact"
  },
  {
    id: "f2f77a02-a018-4c57-8eda-a99e9cda81c7",
    bbl: "1048600116",
    borough: "MANHATTAN",
    zip: "10001",
    house_number_raw: "145",
    house_number_low: 145,
    house_number_high: 145,
    street: "W 29",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "ARTICLE 11",
      "MULTIPLE DWELLING A"
    ],
    block: "4860",
    lot: "116",
    lat: 40.743711,
    lng: -74.004373,
    geocode_quality: "exact"
  },
  {
    id: "fd644c89-859b-489b-b43c-a50968dfd47c",
    bbl: "1049850225",
    borough: "MANHATTAN",
    zip: "10002",
    house_number_raw: "167",
    house_number_low: 167,
    house_number_high: 167,
    street: "DELANCEY",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING B"
    ],
    block: "4985",
    lot: "225",
    lat: 40.714963,
    lng: -73.980313,
    geocode_quality: "exact"
  },
  {
    id: "6635c0a1-fa83-4ea3-a705-d1ea082f8ed2",
    bbl: "1051160081",
    borough: "MANHATTAN",
    zip: "10029",
    house_number_raw: "161",
    house_number_low: 161,
    house_number_high: 161,
    street: "PLEASANT",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "NON-EVICT COOP/CONDO"
    ],
    block: "5116",
    lot: "81",
    lat: 40.790682,
    lng: -73.933955,
    geocode_quality: "exact"
  },
  {
    id: "dc4c4ef8-433b-4ca2-8895-7932893c8a5b",
    bbl: "1052410141",
    borough: "MANHATTAN",
    zip: "10002",
    house_number_raw: "534",
    house_number_low: 534,
    house_number_high: 534,
    street: "RIVINGTON",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5241",
    lot: "141",
    lat: 40.720105,
    lng: -73.990174,
    geocode_quality: "exact"
  },
  {
    id: "727daa24-210c-45fb-a7fa-86881452a36d",
    bbl: "1053720029",
    borough: "MANHATTAN",
    zip: "10030",
    house_number_raw: "571",
    house_number_low: 571,
    house_number_high: 571,
    street: "FREDERICK DOUGLASS",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5372",
    lot: "29",
    lat: 40.812201,
    lng: -73.948656,
    geocode_quality: "exact"
  },
  {
    id: "e2589dd0-3294-4baa-85bb-0282f4d6b349",
    bbl: "1053930234",
    borough: "MANHATTAN",
    zip: "10024",
    house_number_raw: "514",
    house_number_low: 514,
    house_number_high: 514,
    street: "W 106",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING B"
    ],
    block: "5393",
    lot: "234",
    lat: 40.790726,
    lng: -73.971592,
    geocode_quality: "exact"
  },
  {
    id: "4f29d591-51b2-454e-8bff-72fff9a5643f",
    bbl: "1054060029",
    borough: "MANHATTAN",
    zip: "10034",
    house_number_raw: "146",
    house_number_low: 146,
    house_number_high: 146,
    street: "SHERMAN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "HPD"
    ],
    block: "5406",
    lot: "29",
    lat: 40.862402,
    lng: -73.92592,
    geocode_quality: "exact"
  },
  {
    id: "3ff65195-d2f1-4ed0-b1d4-01c7b71c8505",
    bbl: "1054480114",
    borough: "MANHATTAN",
    zip: "10035",
    house_number_raw: "98",
    house_number_low: 98,
    house_number_high: 98,
    street: "PLEASANT",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "5448",
    lot: "114",
    lat: 40.790813,
    lng: -73.937324,
    geocode_quality: "exact"
  },
  {
    id: "fcd977c1-4688-4d0b-a10e-f69fd174c5bf",
    bbl: "1055720294",
    borough: "MANHATTAN",
    zip: "10002",
    house_number_raw: "585",
    house_number_low: 585,
    house_number_high: 585,
    street: "AVENUE B",
    street_suffix: null,
    secondary_address: null,
    statuses: [
      "421-G"
    ],
    block: "5572",
    lot: "294",
    lat: 40.721342,
    lng: -73.984778,
    geocode_quality: "exact"
  },
  {
    id: "8c7d365f-1a78-4e87-9dad-571dbab08f3d",
    bbl: "1055750251",
    borough: "MANHATTAN",
    zip: "10025",
    house_number_raw: "61-69",
    house_number_low: 61,
    house_number_high: 69,
    street: "W 106",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "NON-EVICT COOP/CONDO"
    ],
    block: "5575",
    lot: "251",
    lat: 40.790007,
    lng: -73.978562,
    geocode_quality: "exact"
  },
  {
    id: "031cf766-96db-4e2c-aee4-483c2899b4d9",
    bbl: "1055900456",
    borough: "MANHATTAN",
    zip: "10032",
    house_number_raw: "19",
    house_number_low: 19,
    house_number_high: 19,
    street: "ST NICHOLAS",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5590",
    lot: "456",
    lat: 40.844839,
    lng: -73.939302,
    geocode_quality: "exact"
  },
  {
    id: "6edd1757-f951-4c34-9809-8162986e86ed",
    bbl: "1056880339",
    borough: "MANHATTAN",
    zip: "10029",
    house_number_raw: "584",
    house_number_low: 584,
    house_number_high: 584,
    street: "PLEASANT",
    street_suffix: "AVENUE",
    secondary_address: "140 E 118 STREET",
    statuses: [
      "GARDEN COMPLEX"
    ],
    block: "5688",
    lot: "339",
    lat: 40.791215,
    lng: -73.94032,
    geocode_quality: "exact"
  },
  {
    id: "4039e9fe-7585-4f14-9978-1d0693799bea",
    bbl: "1057400009",
    borough: "MANHATTAN",
    zip: "10009",
    house_number_raw: "409",
    house_number_low: 409,
    house_number_high: 409,
    street: "LUDLOW",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "5740",
    lot: "9",
    lat: 40.714121,
    lng: -73.981622,
    geocode_quality: "exact"
  },
  {
    id: "2af26632-23d4-41a6-82a0-2777f969f322",
    bbl: "1058080388",
    borough: "MANHATTAN",
    zip: "10024",
    house_number_raw: "9",
    house_number_low: 9,
    house_number_high: 9,
    street: "AMSTERDAM",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "HPD"
    ],
    block: "5808",
    lot: "388",
    lat: 40.777294,
    lng: -73.970327,
    geocode_quality: "approximate"
  },
  {
    id: "bb95f152-7b51-47d7-ba79-bf52df428d78",
    bbl: "1058940262",
    borough: "MANHATTAN",
    zip: "10035",
    house_number_raw: "251-257",
    house_number_low: 251,
    house_number_high: 257,
    street: "E 118",
    street_suffix: "STREET",
    secondary_address: "340 E 116 STREET",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5894",
    lot: "262",
    lat: 40.797711,
    lng: -73.945546,
    geocode_quality: "exact"
  },
  {
    id: "f6e1d09e-33cb-4530-9a3c-8454eff55ccb",
    bbl: "1060770381",
    borough: "MANHATTAN",
    zip: "10034",
    house_number_raw: "184",
    house_number_low: 184,
    house_number_high: 184,
    street: "W 207",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6077",
    lot: "381",
    lat: 40.861573,
    lng: -73.930443,
    geocode_quality: "approximate"
  },
  {
    id: "9a694a56-718c-44d4-8954-1afc83d47bda",
    bbl: "1061990198",
    borough: "MANHATTAN",
    zip: "10023",
    house_number_raw: "153",
    house_number_low: 153,
    house_number_high: 153,
    street: "W 94",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "6199",
    lot: "198",
    lat: 40.791101,
    lng: -73.979134,
    geocode_quality: "exact"
  },
  {
    id: "57c29429-bf31-4ec2-9eb9-300348ce2ceb",
    bbl: "1062450275",
    borough: "MANHATTAN",
    zip: "10029",
    house_number_raw: "635-639",
    house_number_low: 635,
    house_number_high: 639,
    street: "E 116",
    street_suffix: "STREET",
    secondary_address: "155 E 116 STREET",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6245",
    lot: "275",
    lat: 40.795716,
    lng: -73.942459,
    geocode_quality: "exact"
  },
  {
    id: "acd2cbfd-118a-4d89-a38c-abe21d924455",
    bbl: "1065080291",
    borough: "MANHATTAN",
    zip: "10035",
    house_number_raw: "240",
    house_number_low: 240,
    house_number_high: 240,
    street: "E 103",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6508",
    lot: "291",
    lat: 40.797879,
    lng: -73.949405,
    geocode_quality: "approximate"
  },
  {
    id: "082bb03b-c8dd-495b-a293-d09b56f20686",
    bbl: "1065330370",
    borough: "MANHATTAN",
    zip: "10002",
    house_number_raw: "571",
    house_number_low: 571,
    house_number_high: 571,
    street: "AVENUE B",
    street_suffix: null,
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6533",
    lot: "370",
    lat: 40.714401,
    lng: -73.984589,
    geocode_quality: "exact"
  },
  {
    id: "1d94def1-363b-4728-ab12-24337d1eee3b",
    bbl: "1067700175",
    borough: "MANHATTAN",
    zip: "10030",
    house_number_raw: "114",
    house_number_low: 114,
    house_number_high: 114,
    street: "FREDERICK DOUGLASS",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6770",
    lot: "175",
    lat: 40.809044,
    lng: -73.942875,
    geocode_quality: "exact"
  },
  {
    id: "96fb20f8-8594-43b6-97ac-7c52c6392e3c",
    bbl: "1067800384",
    borough: "MANHATTAN",
    zip: "10001",
    house_number_raw: "333",
    house_number_low: 333,
    house_number_high: 333,
    street: "8",
    street_suffix: "AVENUE",
    secondary_address: "393 8 AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6780",
    lot: "384",
    lat: 40.749949,
    lng: -73.99859,
    geocode_quality: "exact"
  },
  {
    id: "c6132827-a796-455a-a3c2-d80c7ff18562",
    bbl: "1067980281",
    borough: "MANHATTAN",
    zip: "10011",
    house_number_raw: "79",
    house_number_low: 79,
    house_number_high: 79,
    street: "W 29",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6798",
    lot: "281",
    lat: 40.746481,
    lng: -74.00043,
    geocode_quality: "exact"
  },
  {
    id: "06da83c6-c5b4-4d9d-aa90-2f64686d1bfc",
    bbl: "1068220089",
    borough: "MANHATTAN",
    zip: "10032",
    house_number_raw: "573",
    house_number_low: 573,
    house_number_high: 573,
    street: "W 163",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "SECTION 610 OF PHFL",
      "MULTIPLE DWELLING A"
    ],
    block: "6822",
    lot: "89",
    lat: 40.839071,
    lng: -73.940912,
    geocode_quality: "exact"
  },
  {
    id: "f79b1d43-5208-4eec-b415-52102bd810bd",
    bbl: "1068460267",
    borough: "MANHATTAN",
    zip: "10034",
    house_number_raw: "183",
    house_number_low: 183,
    house_number_high: 183,
    street: "DYCKMAN",
    street_suffix: "STREET",
    secondary_address: "119 SHERMAN AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6846",
    lot: "267",
    lat: 40.865064,
    lng: -73.926272,
    geocode_quality: "exact"
  },
  {
    id: "1e577789-204c-4d1f-9d14-7d89a9fb83b8",
    bbl: "1075100352",
    borough: "MANHATTAN",
    zip: "10009",
    house_number_raw: "593",
    house_number_low: 593,
    house_number_high: 593,
    street: "LUDLOW",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "7510",
    lot: "352",
    lat: 40.715403,
    lng: -73.986989,
    geocode_quality: "exact"
  },
  {
    id: "e9ad02f6-4fcc-4630-9e25-897ab53ef3cc",
    bbl: "1083390366",
    borough: "MANHATTAN",
    zip: "10033",
    house_number_raw: "142",
    house_number_low: 142,
    house_number_high: 142,
    street: "AUDUBON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "SEC 608"
    ],
    block: "8339",
    lot: "366",
    lat: 40.846894,
    lng: -73.943954,
    geocode_quality: "approximate"
  },
  {
    id: "7704fe36-95da-4e76-b51a-5225c90b7f5e",
    bbl: "1087390444",
    borough: "MANHATTAN",
    zip: "10001",
    house_number_raw: "180",
    house_number_low: 180,
    house_number_high: 180,
    street: "W 29",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "8739",
    lot: "444",
    lat: 40.751542,
    lng: -74.003085,
    geocode_quality: "exact"
  },
  {
    id: "ace83e11-fa8b-4128-ad92-ccb8c61bb6cd",
    bbl: "1087940104",
    borough: "MANHATTAN",
    zip: "10039",
    house_number_raw: "517-519",
    house_number_low: 517,
    house_number_high: 519,
    street: "W 135",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "8794",
    lot: "104",
    lat: 40.815366,
    lng: -73.951854,
    geocode_quality: "exact"
  },
  {
    id: "c33c626f-a073-45b8-83b7-135042f4e8ce",
    bbl: "1088370143",
    borough: "MANHATTAN",
    zip: "10011",
    house_number_raw: "186-194",
    house_number_low: 186,
    house_number_high: 194,
    street: "W 29",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "ARTICLES 14 & 15"
    ],
    block: "8837",
    lot: "143",
    lat: 40.74817,
    lng: -73.997012,
    geocode_quality: "exact"
  },
  {
    id: "3ecd7c37-d37a-4113-820e-40accbb8e642",
    bbl: "1088650011",
    borough: "MANHATTAN",
    zip: "10001",
    house_number_raw: "592",
    house_number_low: 592,
    house_number_high: 592,
    street: "W 23",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "MULTIPLE DWELLING B"
    ],
    block: "8865",
    lot: "11",
    lat: 40.743729,
    lng: -73.990624,
    geocode_quality: "exact"
  },
  {
    id: "1952ff31-7d27-4569-a3a1-05ab58575355",
    bbl: "1093880469",
    borough: "MANHATTAN",
    zip: "10030",
    house_number_raw: "583",
    house_number_low: 583,
    house_number_high: 583,
    street: "FREDERICK DOUGLASS",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "9388",
    lot: "469",
    lat: 40.81343,
    lng: -73.940695,
    geocode_quality: "exact"
  },
  {
    id: "e23990c1-f40a-4564-9781-1e9920bb7f22",
    bbl: "1094990179",
    borough: "MANHATTAN",
    zip: "10030",
    house_number_raw: "329",
    house_number_low: 329,
    house_number_high: 329,
    street: "ADAM C POWELL",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9499",
    lot: "179",
    lat: 40.81073,
    lng: -73.946755,
    geocode_quality: "exact"
  },
  {
    id: "3127e1ad-675b-43a3-8da5-3e8d18032ae4",
    bbl: "1095510107",
    borough: "MANHATTAN",
    zip: "10024",
    house_number_raw: "188",
    house_number_low: 188,
    house_number_high: 188,
    street: "W 106",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "ARTICLE 11",
      "GARDEN COMPLEX"
    ],
    block: "9551",
    lot: "107",
    lat: 40.783152,
    lng: -73.972273,
    geocode_quality: "exact"
  },
  {
    id: "78faf16e-8c22-495e-94e4-f42ee1d9909e",
    bbl: "1095870344",
    borough: "MANHATTAN",
    zip: "10034",
    house_number_raw: "103",
    house_number_low: 103,
    house_number_high: 103,
    street: "DYCKMAN",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9587",
    lot: "344",
    lat: 40.873111,
    lng: -73.915408,
    geocode_quality: "exact"
  },
  {
    id: "15595b10-ae3a-46ba-a872-3d1874883124",
    bbl: "1096100448",
    borough: "MANHATTAN",
    zip: "10001",
    house_number_raw: "173-177",
    house_number_low: 173,
    house_number_high: 177,
    street: "W 29",
    street_suffix: "STREET",
    secondary_address: "10 W 23 STREET",
    statuses: [
      "MULTIPLE DWELLING A",
      "J-51"
    ],
    block: "9610",
    lot: "448",
    lat: 40.748012,
    lng: -73.997601,
    geocode_quality: "exact"
  },
  {
    id: "378e8249-9064-45d8-b918-a8ec02cd1971",
    bbl: "1098730104",
    borough: "MANHATTAN",
    zip: "10002",
    house_number_raw: "427-433",
    house_number_low: 427,
    house_number_high: 433,
    street: "E 7",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "9873",
    lot: "104",
    lat: 40.718802,
    lng: -73.988707,
    geocode_quality: "exact"
  },
  {
    id: "c471ef7f-4fa1-421c-8d63-3521fa09cbd0",
    bbl: "1098990050",
    borough: "MANHATTAN",
    zip: "10034",
    house_number_raw: "96",
    house_number_low: 96,
    house_number_high: 96,
    street: "POST",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9899",
    lot: "50",
    lat: 40.870119,
    lng: -73.927518,
    geocode_quality: "exact"
  },
  {
    id: "5dc69192-be5c-4f29-a503-e08f1e74194c",
    bbl: "1099330148",
    borough: "MANHATTAN",
    zip: "10034",
    house_number_raw: "430",
    house_number_low: 430,
    house_number_high: 430,
    street: "SHERMAN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9933",
    lot: "148",
    lat: 40.870767,
    lng: -73.917492,
    geocode_quality: "exact"
  },
  {
    id: "5ec1d5a2-d01d-4291-bde2-f24506deb997",
    bbl: "2000840201",
    borough: "BRONX",
    zip: "10468",
    house_number_raw: "485",
    house_number_low: 485,
    house_number_high: 485,
    street: "VALENTINE",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "84",
    lot: "201",
    lat: 40.860517,
    lng: -73.896529,
    geocode_quality: "approximate"
  },
  {
    id: "9ad53562-7a7c-460c-bdae-a2e26dd004ea",
    bbl: "2000950398",
    borough: "BRONX",
    zip: "10461",
    house_number_raw: "400-406",
    house_number_low: 400,
    house_number_high: 406,
    street: "WHITE PLAINS",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "95",
    lot: "398",
    lat: 40.852576,
    lng: -73.865968,
    geocode_quality: "exact"
  },
  {
    id: "a187dcad-e45a-4ec9-b738-56f9ec852ca7",
    bbl: "2001980260",
    borough: "BRONX",
    zip: "10461",
    house_number_raw: "237-243",
    house_number_low: 237,
    house_number_high: 243,
    street: "WHITE PLAINS",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "COOP/CONDO PLAN FILE"
    ],
    block: "198",
    lot: "260",
    lat: 40.856528,
    lng: -73.864796,
    geocode_quality: "exact"
  },
  {
    id: "878e0013-b2f9-42ef-94d3-4534d8e23312",
    bbl: "2003120280",
    borough: "BRONX",
    zip: "10468",
    house_number_raw: "85-93",
    house_number_low: 85,
    house_number_high: 93,
    street: "JEROME",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "312",
    lot: "280",
    lat: 40.857184,
    lng: -73.902581,
    geocode_quality: "exact"
  },
  {
    id: "8bf0998f-01d3-4664-a221-20dddd389a60",
    bbl: "2004440477",
    borough: "BRONX",
    zip: "10455",
    house_number_raw: "349",
    house_number_low: 349,
    house_number_high: 349,
    street: "WILLIS",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "COOP/CONDO PLAN FILE"
    ],
    block: "444",
    lot: "477",
    lat: 40.813665,
    lng: -73.92054,
    geocode_quality: "exact"
  },
  {
    id: "71592f6c-b9f4-4335-98f2-07bed814bde8",
    bbl: "2006370179",
    borough: "BRONX",
    zip: "10468",
    house_number_raw: "411",
    house_number_low: 411,
    house_number_high: 411,
    street: "GRAND CONCOURSE",
    street_suffix: null,
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "637",
    lot: "179",
    lat: 40.862296,
    lng: -73.907159,
    geocode_quality: "exact"
  },
  {
    id: "998b95af-2700-4716-b4c2-7628a84a7b55",
    bbl: "2006800150",
    borough: "BRONX",
    zip: "10468",
    house_number_raw: "393",
    house_number_low: 393,
    house_number_high: 393,
    street: "VALENTINE",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "680",
    lot: "150",
    lat: 40.856913,
    lng: -73.901937,
    geocode_quality: "exact"
  },
  {
    id: "023348f8-cf28-498e-bbff-8257f6b809b4",
    bbl: "2008440038",
    borough: "BRONX",
    zip: "10458",
    house_number_raw: "552",
    house_number_low: 552,
    house_number_high: 552,
    street: "JEROME",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "844",
    lot: "38",
    lat: 40.865631,
    lng: -73.90175,
    geocode_quality: "exact"
  },
  {
    id: "3972345a-4865-4814-b217-14a4bbdb6028",
    bbl: "2011650144",
    borough: "BRONX",
    zip: "10462",
    house_number_raw: "505",
    house_number_low: 505,
    house_number_high: 505,
    street: "LYDIG",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1165",
    lot: "144",
    lat: 40.850711,
    lng: -73.866338,
    geocode_quality: "exact"
  },
  {
    id: "998a9257-8c23-41b2-8e22-0b67133d3125",
    bbl: "2011750348",
    borough: "BRONX",
    zip: "10456",
    house_number_raw: "27",
    house_number_low: 27,
    house_number_high: 27,
    street: "FRANKLIN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-G"
    ],
    block: "1175",
    lot: "348",
    lat: 40.819396,
    lng: -73.903199,
    geocode_quality: "approximate"
  },
  {
    id: "45060060-2068-45e5-a659-a7bf3afa0a95",
    bbl: "2014520310",
    borough: "BRONX",
    zip: "10471",
    house_number_raw: "582-584",
    house_number_low: 582,
    house_number_high: 584,
    street: "JOHNSON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1452",
    lot: "310",
    lat: 40.89511,
    lng: -73.905856,
    geocode_quality: "exact"
  },
  {
    id: "b7e86d04-325a-4fa1-a116-06b23a41f35e",
    bbl: "2014540089",
    borough: "BRONX",
    zip: "10463",
    house_number_raw: "352",
    house_number_low: 352,
    house_number_high: 352,
    street: "HENRY HUDSON",
    street_suffix: "PARKWAY",
    secondary_address: null,
    statuses: [
      "421-A (1-15)",
      "MULTIPLE DWELLING A"
    ],
    block: "1454",
    lot: "89",
    lat: 40.891273,
    lng: -73.919382,
    geocode_quality: "exact"
  },
  {
    id: "e0f3c93c-0843-40b6-a16a-2ea21d44d3bf",
    bbl: "2014560221",
    borough: "BRONX",
    zip: "10456",
    house_number_raw: "69",
    house_number_low: 69,
    house_number_high: 69,
    street: "FRANKLIN",
    street_suffix: "AVENUE",
    secondary_address: "93 E 170 STREET",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1456",
    lot: "221",
    lat: 40.829445,
    lng: -73.897606,
    geocode_quality: "exact"
  },
  {
    id: "b451ce00-94a4-48ae-9029-012d3ca8117f",
    bbl: "2014800089",
    borough: "BRONX",
    zip: "10472",
    house_number_raw: "399",
    house_number_low: 399,
    house_number_high: 399,
    street: "WESTCHESTER",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "1480",
    lot: "89",
    lat: 40.822113,
    lng: -73.872991,
    geocode_quality: "exact"
  },
  {
    id: "b7bd2547-db56-46a8-b832-41ef3c9addd0",
    bbl: "2016120231",
    borough: "BRONX",
    zip: "10463",
    house_number_raw: "53-61",
    house_number_low: 53,
    house_number_high: 61,
    street: "W 231",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "ROOMING HOUSE"
    ],
    block: "1612",
    lot: "231",
    lat: 40.895854,
    lng: -73.919234,
    geocode_quality: "approximate"
  },
  {
    id: "ff79beac-5361-4e9e-b341-0e8f651c916f",
    bbl: "2016930111",
    borough: "BRONX",
    zip: "10461",
    house_number_raw: "79-83",
    house_number_low: 79,
    house_number_high: 83,
    street: "LYDIG",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "1693",
    lot: "111",
    lat: 40.857215,
    lng: -73.855695,
    geocode_quality: "approximate"
  },
  {
    id: "aefb21b6-de6d-406c-b77e-54c32eb7aa5f",
    bbl: "2018420223",
    borough: "BRONX",
    zip: "10456",
    house_number_raw: "413",
    house_number_low: 413,
    house_number_high: 413,
    street: "E 170",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "421-A (16)"
    ],
    block: "1842",
    lot: "223",
    lat: 40.83281,
    lng: -73.898119,
    geocode_quality: "exact"
  },
  {
    id: "ffb07660-8857-4586-bb39-ac11c9b3b855",
    bbl: "2020310231",
    borough: "BRONX",
    zip: "10473",
    house_number_raw: "512",
    house_number_low: 512,
    house_number_high: 512,
    street: "STORY",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-G",
      "MULTIPLE DWELLING A"
    ],
    block: "2031",
    lot: "231",
    lat: 40.829791,
    lng: -73.868052,
    geocode_quality: "exact"
  },
  {
    id: "46bb3293-35c6-4fea-a596-2d85b6e37eac",
    bbl: "2020630287",
    borough: "BRONX",
    zip: "10461",
    house_number_raw: "54",
    house_number_low: 54,
    house_number_high: 54,
    street: "STILLWELL",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "EVICT COOP/CONDO"
    ],
    block: "2063",
    lot: "287",
    lat: 40.866458,
    lng: -73.859257,
    geocode_quality: "approximate"
  },
  {
    id: "fe769f0f-75bd-4da5-90a9-b4af34332261",
    bbl: "2020860440",
    borough: "BRONX",
    zip: "10468",
    house_number_raw: "476-478",
    house_number_low: 476,
    house_number_high: 478,
    street: "JEROME",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2086",
    lot: "440",
    lat: 40.867185,
    lng: -73.906471,
    geocode_quality: "exact"
  },
  {
    id: "10392a18-4ef2-4be4-bc79-52d5cb8f2244",
    bbl: "2021830173",
    borough: "BRONX",
    zip: "10458",
    house_number_raw: "128",
    house_number_low: 128,
    house_number_high: 128,
    street: "JEROME",
    street_suffix: "AVENUE",
    secondary_address: "201 VALENTINE AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2183",
    lot: "173",
    lat: 40.859089,
    lng: -73.898004,
    geocode_quality: "exact"
  },
  {
    id: "aa3b660b-90d8-4f7d-abeb-1d79fd65ed8e",
    bbl: "2026020137",
    borough: "BRONX",
    zip: "10454",
    house_number_raw: "602-610",
    house_number_low: 602,
    house_number_high: 610,
    street: "WILLIS",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2602",
    lot: "137",
    lat: 40.809532,
    lng: -73.916247,
    geocode_quality: "exact"
  },
  {
    id: "ce1dab6c-8b2b-4d97-b096-e1e6168af213",
    bbl: "2026150370",
    borough: "BRONX",
    zip: "10455",
    house_number_raw: "486",
    house_number_low: 486,
    house_number_high: 486,
    street: "BROWN",
    street_suffix: "PLACE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2615",
    lot: "370",
    lat: 40.814033,
    lng: -73.928871,
    geocode_quality: "exact"
  },
  {
    id: "1b9fb8b7-c3b7-44f4-8207-ae7a7f915ba4",
    bbl: "2028370065",
    borough: "BRONX",
    zip: "10461",
    house_number_raw: "66",
    house_number_low: 66,
    house_number_high: 66,
    street: "STILLWELL",
    street_suffix: "AVENUE",
    secondary_address: "115 MORRIS PARK AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2837",
    lot: "65",
    lat: 40.851905,
    lng: -73.858727,
    geocode_quality: "exact"
  },
  {
    id: "1ebb3b12-a1ef-4bbe-a921-1e7581d30a27",
    bbl: "2029320353",
    borough: "BRONX",
    zip: "10455",
    house_number_raw: "237",
    house_number_low: 237,
    house_number_high: 237,
    street: "BROWN",
    street_suffix: "PLACE",
    secondary_address: null,
    statuses: [
      "GARDEN COMPLEX"
    ],
    block: "2932",
    lot: "353",
    lat: 40.808184,
    lng: -73.926774,
    geocode_quality: "exact"
  },
  {
    id: "43b46bec-8762-4d02-87a5-3e853d9d1168",
    bbl: "2029610084",
    borough: "BRONX",
    zip: "10473",
    house_number_raw: "311",
    house_number_low: 311,
    house_number_high: 311,
    street: "STORY",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2961",
    lot: "84",
    lat: 40.822322,
    lng: -73.877949,
    geocode_quality: "exact"
  },
  {
    id: "89beae02-bfde-4812-bd45-cd29c9a31328",
    bbl: "2031350382",
    borough: "BRONX",
    zip: "10455",
    house_number_raw: "62",
    house_number_low: 62,
    house_number_high: 62,
    street: "ALEXANDER",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3135",
    lot: "382",
    lat: 40.810099,
    lng: -73.91642,
    geocode_quality: "exact"
  },
  {
    id: "5ac4b3bc-4593-4dab-b16d-496cf46be508",
    bbl: "2032230098",
    borough: "BRONX",
    zip: "10462",
    house_number_raw: "225",
    house_number_low: 225,
    house_number_high: 225,
    street: "LYDIG",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "J-51"
    ],
    block: "3223",
    lot: "98",
    lat: 40.8522,
    lng: -73.859287,
    geocode_quality: "exact"
  },
  {
    id: "9e399911-5b79-4a9f-a110-74bf73f2c8da",
    bbl: "2033330215",
    borough: "BRONX",
    zip: "10458",
    house_number_raw: "215",
    house_number_low: 215,
    house_number_high: 215,
    street: "VALENTINE",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "421-A (1-15)"
    ],
    block: "3333",
    lot: "215",
    lat: 40.856581,
    lng: -73.906389,
    geocode_quality: "exact"
  },
  {
    id: "b3fd65a1-fcb0-4912-bbc4-d36653c70a7b",
    bbl: "2034040406",
    borough: "BRONX",
    zip: "10454",
    house_number_raw: "503",
    house_number_low: 503,
    house_number_high: 503,
    street: "E 138",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "421-A (1-15)",
      "421-G"
    ],
    block: "3404",
    lot: "406",
    lat: 40.79931,
    lng: -73.911967,
    geocode_quality: "approximate"
  },
  {
    id: "7f213387-09b0-487d-8c44-8cb3d98455fd",
    bbl: "2034820424",
    borough: "BRONX",
    zip: "10455",
    house_number_raw: "227-229",
    house_number_low: 227,
    house_number_high: 229,
    street: "E 149",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3482",
    lot: "424",
    lat: 40.81454,
    lng: -73.916885,
    geocode_quality: "exact"
  },
  {
    id: "be6f00d0-b94b-46d3-a39f-84e26268414b",
    bbl: "2041100023",
    borough: "BRONX",
    zip: "10455",
    house_number_raw: "415",
    house_number_low: 415,
    house_number_high: 415,
    street: "ALEXANDER",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "4110",
    lot: "23",
    lat: 40.804547,
    lng: -73.924665,
    geocode_quality: "exact"
  },
  {
    id: "8ef1541e-fddc-4816-8f94-93ee694ec18c",
    bbl: "2048690037",
    borough: "BRONX",
    zip: "10471",
    house_number_raw: "68",
    house_number_low: 68,
    house_number_high: 68,
    street: "NETHERLAND",
    street_suffix: "AVENUE",
    secondary_address: "265 JOHNSON AVENUE",
    statuses: [
      "ROOMING HOUSE"
    ],
    block: "4869",
    lot: "37",
    lat: 40.880591,
    lng: -73.92587,
    geocode_quality: "approximate"
  },
  {
    id: "2dd777dd-a220-40ec-99f7-ce1ac5da231c",
    bbl: "2048770070",
    borough: "BRONX",
    zip: "10454",
    house_number_raw: "65-73",
    house_number_low: 65,
    house_number_high: 73,
    street: "E 138",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "HOTEL"
    ],
    block: "4877",
    lot: "70",
    lat: 40.810272,
    lng: -73.926988,
    geocode_quality: "exact"
  },
  {
    id: "8a1875b0-6cd0-4d28-a71f-3c989444980d",
    bbl: "2050390346",
    borough: "BRONX",
    zip: "10455",
    house_number_raw: "560",
    house_number_low: 560,
    house_number_high: 560,
    street: "ALEXANDER",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5039",
    lot: "346",
    lat: 40.808836,
    lng: -73.917213,
    geocode_quality: "exact"
  },
  {
    id: "55562579-d834-4f7e-b790-20a48738b4e6",
    bbl: "2050540100",
    borough: "BRONX",
    zip: "10463",
    house_number_raw: "324",
    house_number_low: 324,
    house_number_high: 324,
    street: "NETHERLAND",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5054",
    lot: "100",
    lat: 40.891244,
    lng: -73.909528,
    geocode_quality: "exact"
  },
  {
    id: "5f4c0796-44fb-4aa4-847b-f5da9754ffb6",
    bbl: "2050800284",
    borough: "BRONX",
    zip: "10454",
    house_number_raw: "270",
    house_number_low: 270,
    house_number_high: 270,
    street: "WILLIS",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5080",
    lot: "284",
    lat: 40.809125,
    lng: -73.916552,
    geocode_quality: "exact"
  },
  {
    id: "6397b47e-0f88-4d47-9f8a-684992545cb8",
    bbl: "2050960415",
    borough: "BRONX",
    zip: "10473",
    house_number_raw: "107",
    house_number_low: 107,
    house_number_high: 107,
    street: "STORY",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "HOTEL"
    ],
    block: "5096",
    lot: "415",
    lat: 40.822964,
    lng: -73.869739,
    geocode_quality: "exact"
  },
  {
    id: "7871cdc5-71f9-41c6-ad2e-09cc3fd4cf74",
    bbl: "2050980307",
    borough: "BRONX",
    zip: "10455",
    house_number_raw: "453-459",
    house_number_low: 453,
    house_number_high: 459,
    street: "WILLIS",
    street_suffix: "AVENUE",
    secondary_address: "106 E 138 STREET",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5098",
    lot: "307",
    lat: 40.811002,
    lng: -73.924939,
    geocode_quality: "exact"
  },
  {
    id: "25d4adb8-f074-4fc3-a6de-c8da7727f319",
    bbl: "2052180389",
    borough: "BRONX",
    zip: "10468",
    house_number_raw: "166",
    house_number_low: 166,
    house_number_high: 166,
    street: "VALENTINE",
    street_suffix: "AVENUE",
    secondary_address: "30 JEROME AVENUE",
    statuses: [
      "421-A (1-15)"
    ],
    block: "5218",
    lot: "389",
    lat: 40.866943,
    lng: -73.905712,
    geocode_quality: "exact"
  },
  {
    id: "4cc6bd71-d88c-4c30-a525-e4801481df62",
    bbl: "2052850159",
    borough: "BRONX",
    zip: "10473",
    house_number_raw: "89",
    house_number_low: 89,
    house_number_high: 89,
    street: "WATSON",
    street_suffix: "AVENUE",
    secondary_address: "134 STORY AVENUE",
    statuses: [
      "NON-EVICT COOP/CONDO"
    ],
    block: "5285",
    lot: "159",
    lat: 40.82911,
    lng: -73.871996,
    geocode_quality: "exact"
  },
  {
    id: "db99cf4e-7c99-4234-b54d-a233c1139d15",
    bbl: "2055130121",
    borough: "BRONX",
    zip: "10463",
    house_number_raw: "156",
    house_number_low: 156,
    house_number_high: 156,
    street: "NETHERLAND",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "5513",
    lot: "121",
    lat: 40.887149,
    lng: -73.915373,
    geocode_quality: "exact"
  },
  {
    id: "176f272a-fba8-4104-a41c-88321b39e164",
    bbl: "2055350263",
    borough: "BRONX",
    zip: "10472",
    house_number_raw: "529",
    house_number_low: 529,
    house_number_high: 529,
    street: "STORY",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "GARDEN COMPLEX",
      "J-51"
    ],
    block: "5535",
    lot: "263",
    lat: 40.822178,
    lng: -73.869165,
    geocode_quality: "exact"
  },
  {
    id: "3498d4c4-8c76-4d2b-86ef-711638f2ee16",
    bbl: "2055580276",
    borough: "BRONX",
    zip: "10455",
    house_number_raw: "504",
    house_number_low: 504,
    house_number_high: 504,
    street: "WILLIS",
    street_suffix: "AVENUE",
    secondary_address: "299 ALEXANDER AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5558",
    lot: "276",
    lat: 40.808365,
    lng: -73.918546,
    geocode_quality: "exact"
  },
  {
    id: "1281d119-2358-441b-b518-5d8b42ec5216",
    bbl: "2055580387",
    borough: "BRONX",
    zip: "10473",
    house_number_raw: "356",
    house_number_low: 356,
    house_number_high: 356,
    street: "STORY",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5558",
    lot: "387",
    lat: 40.821707,
    lng: -73.871794,
    geocode_quality: "exact"
  },
  {
    id: "e4686766-b099-4ff3-b78f-6dae728867be",
    bbl: "2056110143",
    borough: "BRONX",
    zip: "10455",
    house_number_raw: "597",
    house_number_low: 597,
    house_number_high: 597,
    street: "BROWN",
    street_suffix: "PLACE",
    secondary_address: null,
    statuses: [
      "J-51",
      "MULTIPLE DWELLING A"
    ],
    block: "5611",
    lot: "143",
    lat: 40.808946,
    lng: -73.918291,
    geocode_quality: "exact"
  },
  {
    id: "7b750eab-0ee5-4bc6-b47d-c5983a18ef62",
    bbl: "2058170097",
    borough: "BRONX",
    zip: "10454",
    house_number_raw: "452",
    house_number_low: 452,
    house_number_high: 452,
    street: "E 149",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5817",
    lot: "97",
    lat: 40.809763,
    lng: -73.927625,
    geocode_quality: "exact"
  },
  {
    id: "52f61ba4-cb75-4daf-80b2-2e1cb61384e8",
    bbl: "2059100245",
    borough: "BRONX",
    zip: "10461",
    house_number_raw: "222",
    house_number_low: 222,
    house_number_high: 222,
    street: "LYDIG",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5910",
    lot: "245",
    lat: 40.86107,
    lng: -73.868622,
    geocode_quality: "exact"
  },
  {
    id: "4e119483-9b1a-42e2-b492-3fcc6ffddd8f",
    bbl: "2060280155",
    borough: "BRONX",
    zip: "10461",
    house_number_raw: "448-456",
    house_number_low: 448,
    house_number_high: 456,
    street: "STILLWELL",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6028",
    lot: "155",
    lat: 40.850353,
    lng: -73.855927,
    geocode_quality: "exact"
  },
  {
    id: "a0c7027b-7817-45b1-83c7-56c47a5ebb26",
    bbl: "2061250314",
    borough: "BRONX",
    zip: "10458",
    house_number_raw: "269-275",
    house_number_low: 269,
    house_number_high: 275,
    street: "E 188",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6125",
    lot: "314",
    lat: 40.860978,
    lng: -73.899406,
    geocode_quality: "exact"
  },
  {
    id: "621e1da5-21f2-4738-95e3-e500b3e5b18c",
    bbl: "2061560025",
    borough: "BRONX",
    zip: "10473",
    house_number_raw: "354",
    house_number_low: 354,
    house_number_high: 354,
    street: "WESTCHESTER",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "421-A (16)"
    ],
    block: "6156",
    lot: "25",
    lat: 40.823101,
    lng: -73.876583,
    geocode_quality: "exact"
  },
  {
    id: "54198beb-3993-4845-b4a3-7849e9016185",
    bbl: "2061830385",
    borough: "BRONX",
    zip: "10455",
    house_number_raw: "529",
    house_number_low: 529,
    house_number_high: 529,
    street: "E 149",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6183",
    lot: "385",
    lat: 40.813777,
    lng: -73.915822,
    geocode_quality: "exact"
  },
  {
    id: "480a9e69-6180-436b-af54-b609808bf99f",
    bbl: "2063970089",
    borough: "BRONX",
    zip: "10473",
    house_number_raw: "398",
    house_number_low: 398,
    house_number_high: 398,
    street: "WESTCHESTER",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "ARTICLE 11"
    ],
    block: "6397",
    lot: "89",
    lat: 40.829542,
    lng: -73.868328,
    geocode_quality: "exact"
  },
  {
    id: "e1adabae-c6c5-45c6-ae9e-2548373f6851",
    bbl: "2065730357",
    borough: "BRONX",
    zip: "10471",
    house_number_raw: "320",
    house_number_low: 320,
    house_number_high: 320,
    street: "HENRY HUDSON",
    street_suffix: "PARKWAY",
    secondary_address: null,
    statuses: [
      "GARDEN COMPLEX"
    ],
    block: "6573",
    lot: "357",
    lat: 40.891538,
    lng: -73.914582,
    geocode_quality: "exact"
  },
  {
    id: "11cf98d3-795b-435e-b9d6-e91b24e76766",
    bbl: "2066360305",
    borough: "BRONX",
    zip: "10463",
    house_number_raw: "187-193",
    house_number_low: 187,
    house_number_high: 193,
    street: "W 231",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "ARTICLE 11"
    ],
    block: "6636",
    lot: "305",
    lat: 40.892783,
    lng: -73.915005,
    geocode_quality: "exact"
  },
  {
    id: "0d3e3616-5096-4970-9abb-72bcc441ae93",
    bbl: "2066590466",
    borough: "BRONX",
    zip: "10468",
    house_number_raw: "23-27",
    house_number_low: 23,
    house_number_high: 27,
    street: "JEROME",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "EVICT COOP/CONDO"
    ],
    block: "6659",
    lot: "466",
    lat: 40.863803,
    lng: -73.903733,
    geocode_quality: "exact"
  },
  {
    id: "a5d54c97-9fa6-4e52-a1d8-0528c91eddaf",
    bbl: "2073980040",
    borough: "BRONX",
    zip: "10471",
    house_number_raw: "437",
    house_number_low: 437,
    house_number_high: 437,
    street: "W 231",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "EVICT COOP/CONDO"
    ],
    block: "7398",
    lot: "40",
    lat: 40.892419,
    lng: -73.912065,
    geocode_quality: "exact"
  },
  {
    id: "5052c5c4-1e14-493a-bd35-d8a9dbc2347a",
    bbl: "2074270435",
    borough: "BRONX",
    zip: "10461",
    house_number_raw: "349",
    house_number_low: 349,
    house_number_high: 349,
    street: "STILLWELL",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "7427",
    lot: "435",
    lat: 40.853926,
    lng: -73.856197,
    geocode_quality: "exact"
  },
  {
    id: "acc60ee8-b245-41dc-9277-6eb97f5971db",
    bbl: "2074350175",
    borough: "BRONX",
    zip: "10457",
    house_number_raw: "594-598",
    house_number_low: 594,
    house_number_high: 598,
    street: "BOSTON",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "7435",
    lot: "175",
    lat: 40.824512,
    lng: -73.911164,
    geocode_quality: "exact"
  },
  {
    id: "349bca04-dd8f-43e6-b49b-870c7f92356c",
    bbl: "2076940095",
    borough: "BRONX",
    zip: "10457",
    house_number_raw: "346-350",
    house_number_low: 346,
    house_number_high: 350,
    street: "FULTON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "7694",
    lot: "95",
    lat: 40.834497,
    lng: -73.903981,
    geocode_quality: "exact"
  },
  {
    id: "2fae96b2-b4fe-41c2-9ae7-89c4ec96cdd0",
    bbl: "2077040113",
    borough: "BRONX",
    zip: "10471",
    house_number_raw: "47",
    house_number_low: 47,
    house_number_high: 47,
    street: "NETHERLAND",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "GARDEN COMPLEX"
    ],
    block: "7704",
    lot: "113",
    lat: 40.888439,
    lng: -73.919171,
    geocode_quality: "approximate"
  },
  {
    id: "fdd2bf75-d885-4009-9544-a4b03fa2e46d",
    bbl: "2078840246",
    borough: "BRONX",
    zip: "10458",
    house_number_raw: "211",
    house_number_low: 211,
    house_number_high: 211,
    street: "WEBSTER",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "7884",
    lot: "246",
    lat: 40.863717,
    lng: -73.900408,
    geocode_quality: "exact"
  },
  {
    id: "71529284-dd11-442b-9860-2ae2ea13811c",
    bbl: "2079400398",
    borough: "BRONX",
    zip: "10458",
    house_number_raw: "145",
    house_number_low: 145,
    house_number_high: 145,
    street: "WEBSTER",
    street_suffix: "AVENUE",
    secondary_address: "373 GRAND CONCOURSE",
    statuses: [
      "421-A (1-15)"
    ],
    block: "7940",
    lot: "398",
    lat: 40.857427,
    lng: -73.898137,
    geocode_quality: "exact"
  },
  {
    id: "5454643f-00d3-439d-8b6a-80cee34f5e0f",
    bbl: "2080030027",
    borough: "BRONX",
    zip: "10473",
    house_number_raw: "106",
    house_number_low: 106,
    house_number_high: 106,
    street: "WESTCHESTER",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "HPD"
    ],
    block: "8003",
    lot: "27",
    lat: 40.822318,
    lng: -73.867295,
    geocode_quality: "approximate"
  },
  {
    id: "f9b0fa56-055e-4777-946a-dc10927f81f2",
    bbl: "2080590082",
    borough: "BRONX",
    zip: "10457",
    house_number_raw: "241",
    house_number_low: 241,
    house_number_high: 241,
    street: "BOSTON",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "8059",
    lot: "82",
    lat: 40.832426,
    lng: -73.901948,
    geocode_quality: "approximate"
  },
  {
    id: "108a9b9b-813e-4a51-aabe-f20875597c66",
    bbl: "2082140334",
    borough: "BRONX",
    zip: "10473",
    house_number_raw: "347-355",
    house_number_low: 347,
    house_number_high: 355,
    street: "WATSON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "8214",
    lot: "334",
    lat: 40.826126,
    lng: -73.872669,
    geocode_quality: "exact"
  },
  {
    id: "daaa296e-bb27-4c08-9ec7-1df542f5184a",
    bbl: "2082930140",
    borough: "BRONX",
    zip: "10472",
    house_number_raw: "586",
    house_number_low: 586,
    house_number_high: 586,
    street: "WATSON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "COOP/CONDO PLAN FILE"
    ],
    block: "8293",
    lot: "140",
    lat: 40.830077,
    lng: -73.877093,
    geocode_quality: "exact"
  },
  {
    id: "1f82dedf-d2f0-4d99-b4c5-bfc259a615f7",
    bbl: "2083040388",
    borough: "BRONX",
    zip: "10462",
    house_number_raw: "423-427",
    house_number_low: 423,
    house_number_high: 427,
    street: "LYDIG",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "8304",
    lot: "388",
    lat: 40.859541,
    lng: -73.858016,
    geocode_quality: "exact"
  },
  {
    id: "db991d75-7a62-479f-99ef-13cc155d90f9",
    bbl: "2083530082",
    borough: "BRONX",
    zip: "10462",
    house_number_raw: "160",
    house_number_low: 160,
    house_number_high: 160,
    street: "STILLWELL",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "8353",
    lot: "82",
    lat: 40.858803,
    lng: -73.864069,
    geocode_quality: "exact"
  },
  {
    id: "51185258-bd12-403f-99e9-1448327e10fd",
    bbl: "2083840015",
    borough: "BRONX",
    zip: "10461",
    house_number_raw: "88",
    house_number_low: 88,
    house_number_high: 88,
    street: "STILLWELL",
    street_suffix: "AVENUE",
    secondary_address: "58 WHITE PLAINS ROAD",
    statuses: [
      "421-A (16)",
      "GARDEN COMPLEX"
    ],
    block: "8384",
    lot: "15",
    lat: 40.856265,
    lng: -73.861536,
    geocode_quality: "exact"
  },
  {
    id: "1a3c0345-5bda-47f8-b359-efb6cd40379d",
    bbl: "2084840229",
    borough: "BRONX",
    zip: "10471",
    house_number_raw: "294",
    house_number_low: 294,
    house_number_high: 294,
    street: "HENRY HUDSON",
    street_suffix: "PARKWAY",
    secondary_address: null,
    statuses: [
      "GARDEN COMPLEX",
      "421-A (16)"
    ],
    block: "8484",
    lot: "229",
    lat: 40.887239,
    lng: -73.907941,
    geocode_quality: "exact"
  },
  {
    id: "bdd30708-3640-4479-a92a-01f267e3f9df",
    bbl: "2093450088",
    borough: "BRONX",
    zip: "10454",
    house_number_raw: "580",
    house_number_low: 580,
    house_number_high: 580,
    street: "BROWN",
    street_suffix: "PLACE",
    secondary_address: "389 E 138 STREET",
    statuses: [
      "421-A (1-15)"
    ],
    block: "9345",
    lot: "88",
    lat: 40.812696,
    lng: -73.916359,
    geocode_quality: "approximate"
  },
  {
    id: "b6bba05d-2fb3-4100-a576-26c32b1395d8",
    bbl: "2094480460",
    borough: "BRONX",
    zip: "10461",
    house_number_raw: "588",
    house_number_low: 588,
    house_number_high: 588,
    street: "STILLWELL",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9448",
    lot: "460",
    lat: 40.858231,
    lng: -73.855699,
    geocode_quality: "exact"
  },
  {
    id: "605ec374-2c74-41ad-8084-b7c1f0e58038",
    bbl: "2095610083",
    borough: "BRONX",
    zip: "10462",
    house_number_raw: "13-15",
    house_number_low: 13,
    house_number_high: 15,
    street: "WHITE PLAINS",
    street_suffix: "ROAD",
    secondary_address: "133 WHITE PLAINS ROAD",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9561",
    lot: "83",
    lat: 40.851168,
    lng: -73.875539,
    geocode_quality: "approximate"
  },
  {
    id: "5c903412-e29c-4897-90a1-8c57c3842b24",
    bbl: "2095720080",
    borough: "BRONX",
    zip: "10458",
    house_number_raw: "538",
    house_number_low: 538,
    house_number_high: 538,
    street: "VALENTINE",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "420C"
    ],
    block: "9572",
    lot: "80",
    lat: 40.866481,
    lng: -73.898663,
    geocode_quality: "exact"
  },
  {
    id: "56873590-04ea-401a-9072-87ac42b001d0",
    bbl: "2095870167",
    borough: "BRONX",
    zip: "10462",
    house_number_raw: "533",
    house_number_low: 533,
    house_number_high: 533,
    street: "MORRIS PARK",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "9587",
    lot: "167",
    lat: 40.851618,
    lng: -73.861758,
    geocode_quality: "exact"
  },
  {
    id: "a340e46a-e5a3-48a2-b958-7221ace2116b",
    bbl: "2095990417",
    borough: "BRONX",
    zip: "10473",
    house_number_raw: "57",
    house_number_low: 57,
    house_number_high: 57,
    street: "WATSON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9599",
    lot: "417",
    lat: 40.825944,
    lng: -73.872639,
    geocode_quality: "exact"
  },
  {
    id: "98934507-b561-481e-a0ab-0f4b5f19d5da",
    bbl: "2097580193",
    borough: "BRONX",
    zip: "10461",
    house_number_raw: "508",
    house_number_low: 508,
    house_number_high: 508,
    street: "LYDIG",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING B",
      "MULTIPLE DWELLING A"
    ],
    block: "9758",
    lot: "193",
    lat: 40.855796,
    lng: -73.865491,
    geocode_quality: "exact"
  },
  {
    id: "9d15dc12-018a-4110-a737-f8923afa2073",
    bbl: "2098930087",
    borough: "BRONX",
    zip: "10468",
    house_number_raw: "37",
    house_number_low: 37,
    house_number_high: 37,
    street: "WEBSTER",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "HOTEL"
    ],
    block: "9893",
    lot: "87",
    lat: 40.862489,
    lng: -73.899774,
    geocode_quality: "exact"
  },
  {
    id: "6a23a24c-6244-4f8e-993c-54c59c8c518c",
    bbl: "3000310132",
    borough: "BROOKLYN",
    zip: "11220",
    house_number_raw: "585-593",
    house_number_low: 585,
    house_number_high: 593,
    street: "8",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING B"
    ],
    block: "31",
    lot: "132",
    lat: 40.64571,
    lng: -74.015972,
    geocode_quality: "exact"
  },
  {
    id: "43f875de-f18e-4894-b685-23d5f478d8e1",
    bbl: "3001930214",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "496",
    house_number_low: 496,
    house_number_high: 496,
    street: "86",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "193",
    lot: "214",
    lat: 40.625859,
    lng: -74.035488,
    geocode_quality: "exact"
  },
  {
    id: "ab4a5084-49d3-44a8-8e45-fb8e4921d8be",
    bbl: "3003010405",
    borough: "BROOKLYN",
    zip: "11232",
    house_number_raw: "135",
    house_number_low: 135,
    house_number_high: 135,
    street: "5",
    street_suffix: "AVENUE",
    secondary_address: "128 44 STREET",
    statuses: [
      "EVICT COOP/CONDO"
    ],
    block: "301",
    lot: "405",
    lat: 40.649557,
    lng: -74.013144,
    geocode_quality: "exact"
  },
  {
    id: "56879bfc-e3d9-4119-ac5b-13f603512ce2",
    bbl: "3005460307",
    borough: "BROOKLYN",
    zip: "11207",
    house_number_raw: "72-76",
    house_number_low: 72,
    house_number_high: 76,
    street: "ATLANTIC",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "546",
    lot: "307",
    lat: 40.668488,
    lng: -73.878305,
    geocode_quality: "exact"
  },
  {
    id: "7ad5b56b-9443-42ed-a42e-7e794b78a05a",
    bbl: "3006460093",
    borough: "BROOKLYN",
    zip: "11210",
    house_number_raw: "135-137",
    house_number_low: 135,
    house_number_high: 137,
    street: "OCEAN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "646",
    lot: "93",
    lat: 40.643477,
    lng: -73.961167,
    geocode_quality: "exact"
  },
  {
    id: "8a839001-5772-4957-b133-3970b2bccf00",
    bbl: "3007480277",
    borough: "BROOKLYN",
    zip: "11211",
    house_number_raw: "294",
    house_number_low: 294,
    house_number_high: 294,
    street: "S 3",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "748",
    lot: "277",
    lat: 40.705662,
    lng: -73.959358,
    geocode_quality: "exact"
  },
  {
    id: "a8450245-9e52-4844-be9d-a12ab6a2cda0",
    bbl: "3008700243",
    borough: "BROOKLYN",
    zip: "11235",
    house_number_raw: "206",
    house_number_low: 206,
    house_number_high: 206,
    street: "SHEEPSHEAD BAY",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "ROOMING HOUSE"
    ],
    block: "870",
    lot: "243",
    lat: 40.580834,
    lng: -73.935543,
    geocode_quality: "approximate"
  },
  {
    id: "86174b6a-9e15-430c-84ab-497280c1a3e0",
    bbl: "3009440431",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "559",
    house_number_low: 559,
    house_number_high: 559,
    street: "76",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "944",
    lot: "431",
    lat: 40.626355,
    lng: -74.034637,
    geocode_quality: "exact"
  },
  {
    id: "671d339b-af5d-410c-8bdf-fff42ca0fbbf",
    bbl: "3011110033",
    borough: "BROOKLYN",
    zip: "11210",
    house_number_raw: "513",
    house_number_low: 513,
    house_number_high: 513,
    street: "OCEAN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING B"
    ],
    block: "1111",
    lot: "33",
    lat: 40.642461,
    lng: -73.957245,
    geocode_quality: "exact"
  },
  {
    id: "5f29f38f-460c-4e93-a3f7-f4d924220370",
    bbl: "3012060300",
    borough: "BROOKLYN",
    zip: "11226",
    house_number_raw: "480",
    house_number_low: 480,
    house_number_high: 480,
    street: "CHURCH",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1206",
    lot: "300",
    lat: 40.643423,
    lng: -73.967123,
    geocode_quality: "exact"
  },
  {
    id: "814807be-f7c7-49d0-bdd6-63e8a004d748",
    bbl: "3012620296",
    borough: "BROOKLYN",
    zip: "11233",
    house_number_raw: "30",
    house_number_low: 30,
    house_number_high: 30,
    street: "KOSCIUSZKO",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "GARDEN COMPLEX",
      "HOTEL"
    ],
    block: "1262",
    lot: "296",
    lat: 40.682391,
    lng: -73.939218,
    geocode_quality: "exact"
  },
  {
    id: "8a055c25-f794-494d-afa7-73d00241f83b",
    bbl: "3013060366",
    borough: "BROOKLYN",
    zip: "11220",
    house_number_raw: "435",
    house_number_low: 435,
    house_number_high: 435,
    street: "50",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1306",
    lot: "366",
    lat: 40.644487,
    lng: -74.006715,
    geocode_quality: "exact"
  },
  {
    id: "3d12b4ec-c3d3-41c8-9c9d-9ea4ad531d2b",
    bbl: "3014120240",
    borough: "BROOKLYN",
    zip: "11216",
    house_number_raw: "408",
    house_number_low: 408,
    house_number_high: 408,
    street: "LEXINGTON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "ARTICLE 11",
      "421-A (16)"
    ],
    block: "1412",
    lot: "240",
    lat: 40.689144,
    lng: -73.946617,
    geocode_quality: "exact"
  },
  {
    id: "ca80b664-c89f-4730-9c2a-b70ac30e0ef3",
    bbl: "3014920322",
    borough: "BROOKLYN",
    zip: "11210",
    house_number_raw: "183-189",
    house_number_low: 183,
    house_number_high: 189,
    street: "FLATBUSH",
    street_suffix: "AVENUE",
    secondary_address: "325 CORTELYOU ROAD",
    statuses: [
      "MULTIPLE DWELLING B",
      "421-A (16)"
    ],
    block: "1492",
    lot: "322",
    lat: 40.638318,
    lng: -73.963399,
    geocode_quality: "exact"
  },
  {
    id: "dd4e4b2f-2240-4291-81f7-796d9798ccfe",
    bbl: "3014960379",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "76",
    house_number_low: 76,
    house_number_high: 76,
    street: "76",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING B"
    ],
    block: "1496",
    lot: "379",
    lat: 40.628422,
    lng: -74.025441,
    geocode_quality: "exact"
  },
  {
    id: "10c84c4f-4ef2-484d-9dd1-49a6e08395d7",
    bbl: "3015160049",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "619",
    house_number_low: 619,
    house_number_high: 619,
    street: "86",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "ARTICLES 14 & 15",
      "GARDEN COMPLEX"
    ],
    block: "1516",
    lot: "49",
    lat: 40.621496,
    lng: -74.041707,
    geocode_quality: "approximate"
  },
  {
    id: "6ec6f400-ae6a-4e45-9681-448c44b02750",
    bbl: "3016500025",
    borough: "BROOKLYN",
    zip: "11232",
    house_number_raw: "8",
    house_number_low: 8,
    house_number_high: 8,
    street: "8",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "NON-EVICT COOP/CONDO"
    ],
    block: "1650",
    lot: "25",
    lat: 40.64273,
    lng: -74.015532,
    geocode_quality: "exact"
  },
  {
    id: "fe1f7126-bd2c-4e28-8e43-4a804e19ed0e",
    bbl: "3016750039",
    borough: "BROOKLYN",
    zip: "11235",
    house_number_raw: "251-253",
    house_number_low: 251,
    house_number_high: 253,
    street: "AVENUE Z",
    street_suffix: null,
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1675",
    lot: "39",
    lat: 40.585787,
    lng: -73.949056,
    geocode_quality: "exact"
  },
  {
    id: "ec9c7216-190c-4428-b0da-354a3b3b27c6",
    bbl: "3017560101",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "482",
    house_number_low: 482,
    house_number_high: 482,
    street: "76",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "420C",
      "421-A (1-15)"
    ],
    block: "1756",
    lot: "101",
    lat: 40.624552,
    lng: -74.0243,
    geocode_quality: "exact"
  },
  {
    id: "2ce2e98c-d7fa-40b3-b01a-6d0e33d3b776",
    bbl: "3017770292",
    borough: "BROOKLYN",
    zip: "11213",
    house_number_raw: "452",
    house_number_low: 452,
    house_number_high: 452,
    street: "NOSTRAND",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "GARDEN COMPLEX",
      "421-A (1-15)"
    ],
    block: "1777",
    lot: "292",
    lat: 40.674114,
    lng: -73.941711,
    geocode_quality: "exact"
  },
  {
    id: "84cf3eb8-807a-4598-9d9b-267e0ffe5ce7",
    bbl: "3019430079",
    borough: "BROOKLYN",
    zip: "11213",
    house_number_raw: "390",
    house_number_low: 390,
    house_number_high: 390,
    street: "UNION",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "J-51",
      "MULTIPLE DWELLING A"
    ],
    block: "1943",
    lot: "79",
    lat: 40.672913,
    lng: -73.947771,
    geocode_quality: "exact"
  },
  {
    id: "7037fb9f-ff18-476d-8ad6-eac065b6aa02",
    bbl: "3019540304",
    borough: "BROOKLYN",
    zip: "11210",
    house_number_raw: "131",
    house_number_low: 131,
    house_number_high: 131,
    street: "CORTELYOU",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "421-A (16)"
    ],
    block: "1954",
    lot: "304",
    lat: 40.639053,
    lng: -73.961991,
    geocode_quality: "exact"
  },
  {
    id: "f573ac62-63a4-498e-b60f-d49fd8aeef4b",
    bbl: "3019720387",
    borough: "BROOKLYN",
    zip: "11221",
    house_number_raw: "198",
    house_number_low: 198,
    house_number_high: 198,
    street: "NOSTRAND",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "ROOMING HOUSE",
      "NON-EVICT COOP/CONDO"
    ],
    block: "1972",
    lot: "387",
    lat: 40.686996,
    lng: -73.937727,
    geocode_quality: "exact"
  },
  {
    id: "080c922e-846a-4e22-8202-2f2ee307767d",
    bbl: "3021580326",
    borough: "BROOKLYN",
    zip: "11232",
    house_number_raw: "252",
    house_number_low: 252,
    house_number_high: 252,
    street: "44",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "J-51",
      "MULTIPLE DWELLING A"
    ],
    block: "2158",
    lot: "326",
    lat: 40.649234,
    lng: -74.000791,
    geocode_quality: "approximate"
  },
  {
    id: "c439a028-91a1-4dab-b55c-c60651a07667",
    bbl: "3024790386",
    borough: "BROOKLYN",
    zip: "11229",
    house_number_raw: "16-18",
    house_number_low: 16,
    house_number_high: 18,
    street: "E 17",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2479",
    lot: "386",
    lat: 40.58991,
    lng: -73.946127,
    geocode_quality: "exact"
  },
  {
    id: "305eac8c-61aa-4dad-aaa0-9549502ec0b3",
    bbl: "3024950024",
    borough: "BROOKLYN",
    zip: "11226",
    house_number_raw: "606",
    house_number_low: 606,
    house_number_high: 606,
    street: "E 21",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2495",
    lot: "24",
    lat: 40.643187,
    lng: -73.968537,
    geocode_quality: "exact"
  },
  {
    id: "89e4e68f-5e59-4427-9c44-2665213fbaff",
    bbl: "3026560042",
    borough: "BROOKLYN",
    zip: "11221",
    house_number_raw: "577-579",
    house_number_low: 577,
    house_number_high: 579,
    street: "MACON",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "COOP/CONDO PLAN FILE"
    ],
    block: "2656",
    lot: "42",
    lat: 40.6859,
    lng: -73.938753,
    geocode_quality: "exact"
  },
  {
    id: "f6050f59-f6c1-457b-ba38-379dbcc2a6c9",
    bbl: "3027620152",
    borough: "BROOKLYN",
    zip: "11207",
    house_number_raw: "23",
    house_number_low: 23,
    house_number_high: 23,
    street: "EUCLID",
    street_suffix: "AVENUE",
    secondary_address: "96 ATLANTIC AVENUE",
    statuses: [
      "J-51"
    ],
    block: "2762",
    lot: "152",
    lat: 40.666612,
    lng: -73.876969,
    geocode_quality: "exact"
  },
  {
    id: "8114ccdc-b4f3-46e7-8065-1bfac6f017f2",
    bbl: "3029240016",
    borough: "BROOKLYN",
    zip: "11210",
    house_number_raw: "83",
    house_number_low: 83,
    house_number_high: 83,
    street: "FLATBUSH",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2924",
    lot: "16",
    lat: 40.636337,
    lng: -73.964269,
    geocode_quality: "exact"
  },
  {
    id: "8098afb4-8148-41c6-8f94-09cfdcdf59d2",
    bbl: "3029520041",
    borough: "BROOKLYN",
    zip: "11233",
    house_number_raw: "624-630",
    house_number_low: 624,
    house_number_high: 630,
    street: "NOSTRAND",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "GARDEN COMPLEX"
    ],
    block: "2952",
    lot: "41",
    lat: 40.690605,
    lng: -73.935514,
    geocode_quality: "exact"
  },
  {
    id: "43ef3ad4-5d69-45ea-b406-9c694046e11e",
    bbl: "3029970310",
    borough: "BROOKLYN",
    zip: "11221",
    house_number_raw: "115",
    house_number_low: 115,
    house_number_high: 115,
    street: "KOSCIUSZKO",
    street_suffix: "STREET",
    secondary_address: "89 NOSTRAND AVENUE",
    statuses: [
      "421-A (16)"
    ],
    block: "2997",
    lot: "310",
    lat: 40.687869,
    lng: -73.941518,
    geocode_quality: "exact"
  },
  {
    id: "8f77db46-0028-45a0-9ef6-39883c4d8d73",
    bbl: "3030790463",
    borough: "BROOKLYN",
    zip: "11208",
    house_number_raw: "472",
    house_number_low: 472,
    house_number_high: 472,
    street: "ATLANTIC",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3079",
    lot: "463",
    lat: 40.6695,
    lng: -73.874271,
    geocode_quality: "exact"
  },
  {
    id: "3adee88c-ca1f-44a3-a0b4-4141cdbe4632",
    bbl: "3031100470",
    borough: "BROOKLYN",
    zip: "11208",
    house_number_raw: "215-221",
    house_number_low: 215,
    house_number_high: 221,
    street: "EUCLID",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3110",
    lot: "470",
    lat: 40.668341,
    lng: -73.883545,
    geocode_quality: "exact"
  },
  {
    id: "bd835f1a-55d5-4af2-8d10-a6a8e9813b0b",
    bbl: "3031110076",
    borough: "BROOKLYN",
    zip: "11211",
    house_number_raw: "53",
    house_number_low: 53,
    house_number_high: 53,
    street: "METROPOLITAN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "ARTICLE 11"
    ],
    block: "3111",
    lot: "76",
    lat: 40.710632,
    lng: -73.954838,
    geocode_quality: "exact"
  },
  {
    id: "42b9a48c-89cb-4e9c-93f9-a9de8c1d75a5",
    bbl: "3032180084",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "43-49",
    house_number_low: 43,
    house_number_high: 49,
    street: "76",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3218",
    lot: "84",
    lat: 40.628113,
    lng: -74.032517,
    geocode_quality: "exact"
  },
  {
    id: "2792cf3c-1319-4f25-8968-427b60b34b19",
    bbl: "3032970206",
    borough: "BROOKLYN",
    zip: "11208",
    house_number_raw: "273-275",
    house_number_low: 273,
    house_number_high: 275,
    street: "LIBERTY",
    street_suffix: "AVENUE",
    secondary_address: "337 PITKIN AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3297",
    lot: "206",
    lat: 40.673701,
    lng: -73.882807,
    geocode_quality: "exact"
  },
  {
    id: "8feaef22-88cc-41cf-ba73-436934f74291",
    bbl: "3033120454",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "61",
    house_number_low: 61,
    house_number_high: 61,
    street: "SHORE",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3312",
    lot: "454",
    lat: 40.628676,
    lng: -74.033425,
    geocode_quality: "exact"
  },
  {
    id: "8f4f7e85-0195-48ef-95c9-104cfcbc8a3e",
    bbl: "3035130333",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "526",
    house_number_low: 526,
    house_number_high: 526,
    street: "86",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3513",
    lot: "333",
    lat: 40.622923,
    lng: -74.030895,
    geocode_quality: "exact"
  },
  {
    id: "84871c71-f0a3-47a9-b211-83c49d29f30e",
    bbl: "3035300192",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "638",
    house_number_low: 638,
    house_number_high: 638,
    street: "76",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3530",
    lot: "192",
    lat: 40.622983,
    lng: -74.026961,
    geocode_quality: "exact"
  },
  {
    id: "8e2c3303-6ce9-4f4a-9863-2aae8dae340a",
    bbl: "3035550047",
    borough: "BROOKLYN",
    zip: "11206",
    house_number_raw: "40",
    house_number_low: 40,
    house_number_high: 40,
    street: "GRAHAM",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3555",
    lot: "47",
    lat: 40.706344,
    lng: -73.9503,
    geocode_quality: "exact"
  },
  {
    id: "092c1964-6f9e-46a2-9f1d-51ec7725a0bb",
    bbl: "3037450106",
    borough: "BROOKLYN",
    zip: "11220",
    house_number_raw: "209-211",
    house_number_low: 209,
    house_number_high: 211,
    street: "44",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "SECTION 610 OF PHFL",
      "HPD"
    ],
    block: "3745",
    lot: "106",
    lat: 40.647902,
    lng: -74.008808,
    geocode_quality: "exact"
  },
  {
    id: "d09bcd38-46ab-4ada-a4e6-853189f7a3eb",
    bbl: "3037570393",
    borough: "BROOKLYN",
    zip: "11206",
    house_number_raw: "167",
    house_number_low: 167,
    house_number_high: 167,
    street: "METROPOLITAN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "3757",
    lot: "393",
    lat: 40.711947,
    lng: -73.953125,
    geocode_quality: "exact"
  },
  {
    id: "d178b28b-5a18-4ec8-9db7-a83f24e6d539",
    bbl: "3038050343",
    borough: "BROOKLYN",
    zip: "11211",
    house_number_raw: "15",
    house_number_low: 15,
    house_number_high: 15,
    street: "S 3",
    street_suffix: "STREET",
    secondary_address: "32 GRAHAM AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3805",
    lot: "343",
    lat: 40.704744,
    lng: -73.962009,
    geocode_quality: "exact"
  },
  {
    id: "5af04afd-75d1-4d70-8aef-593776ed1309",
    bbl: "3038580434",
    borough: "BROOKLYN",
    zip: "11226",
    house_number_raw: "116-118",
    house_number_low: 116,
    house_number_high: 118,
    street: "CHURCH",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3858",
    lot: "434",
    lat: 40.631378,
    lng: -73.953792,
    geocode_quality: "approximate"
  },
  {
    id: "96b6a5a2-6d20-4a76-a69a-715451511e5c",
    bbl: "3038730358",
    borough: "BROOKLYN",
    zip: "11232",
    house_number_raw: "59",
    house_number_low: 59,
    house_number_high: 59,
    street: "50",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "ART V",
      "HOTEL"
    ],
    block: "3873",
    lot: "358",
    lat: 40.642051,
    lng: -74.00826,
    geocode_quality: "exact"
  },
  {
    id: "23f31655-52cf-4de7-8662-1d2f2b88b0bb",
    bbl: "3039520435",
    borough: "BROOKLYN",
    zip: "11210",
    house_number_raw: "415",
    house_number_low: 415,
    house_number_high: 415,
    street: "FLATBUSH",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "J-51"
    ],
    block: "3952",
    lot: "435",
    lat: 40.643628,
    lng: -73.964675,
    geocode_quality: "approximate"
  },
  {
    id: "5a3e32db-f159-445d-967f-795253ddbc75",
    bbl: "3043240352",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "184",
    house_number_low: 184,
    house_number_high: 184,
    street: "76",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "4324",
    lot: "352",
    lat: 40.626255,
    lng: -74.029599,
    geocode_quality: "exact"
  },
  {
    id: "04039480-e409-4e9f-817a-d8f635b60028",
    bbl: "3046030236",
    borough: "BROOKLYN",
    zip: "11213",
    house_number_raw: "300",
    house_number_low: 300,
    house_number_high: 300,
    street: "ROGERS",
    street_suffix: "AVENUE",
    secondary_address: "255 UNION STREET",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "4603",
    lot: "236",
    lat: 40.670498,
    lng: -73.946867,
    geocode_quality: "exact"
  },
  {
    id: "f6fb6771-ba91-44bc-9170-a124b8b66fa3",
    bbl: "3048350123",
    borough: "BROOKLYN",
    zip: "11208",
    house_number_raw: "36-42",
    house_number_low: 36,
    house_number_high: 42,
    street: "ATLANTIC",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "4835",
    lot: "123",
    lat: 40.673211,
    lng: -73.875592,
    geocode_quality: "exact"
  },
  {
    id: "3ee85a69-a348-4b8d-b3d3-5de7a0125ff3",
    bbl: "3048460005",
    borough: "BROOKLYN",
    zip: "11220",
    house_number_raw: "379",
    house_number_low: 379,
    house_number_high: 379,
    street: "50",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "4846",
    lot: "5",
    lat: 40.642304,
    lng: -74.011729,
    geocode_quality: "exact"
  },
  {
    id: "249ac3e3-6e55-4df4-bae4-604edd3c5e26",
    bbl: "3050670410",
    borough: "BROOKLYN",
    zip: "11235",
    house_number_raw: "130",
    house_number_low: 130,
    house_number_high: 130,
    street: "OCEAN",
    street_suffix: "PARKWAY",
    secondary_address: null,
    statuses: [
      "SECTION 610 OF PHFL",
      "GARDEN COMPLEX"
    ],
    block: "5067",
    lot: "410",
    lat: 40.587703,
    lng: -73.949459,
    geocode_quality: "exact"
  },
  {
    id: "3e91feb9-982c-431c-a670-a6e78b04b81e",
    bbl: "3050720344",
    borough: "BROOKLYN",
    zip: "11211",
    house_number_raw: "410",
    house_number_low: 410,
    house_number_high: 410,
    street: "METROPOLITAN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5072",
    lot: "344",
    lat: 40.712039,
    lng: -73.954149,
    geocode_quality: "exact"
  },
  {
    id: "251a374a-3e11-4b25-af44-021260fdbed4",
    bbl: "3050790006",
    borough: "BROOKLYN",
    zip: "11233",
    house_number_raw: "377",
    house_number_low: 377,
    house_number_high: 377,
    street: "NOSTRAND",
    street_suffix: "AVENUE",
    secondary_address: "229 HALSEY STREET",
    statuses: [
      "NON-EVICT COOP/CONDO"
    ],
    block: "5079",
    lot: "6",
    lat: 40.684869,
    lng: -73.936641,
    geocode_quality: "exact"
  },
  {
    id: "d0c3af57-2ca3-460b-9faa-17306346f3aa",
    bbl: "3051940218",
    borough: "BROOKLYN",
    zip: "11216",
    house_number_raw: "22",
    house_number_low: 22,
    house_number_high: 22,
    street: "NOSTRAND",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5194",
    lot: "218",
    lat: 40.687097,
    lng: -73.943881,
    geocode_quality: "exact"
  },
  {
    id: "40ca4f08-7a93-4311-b96a-02428954d6a2",
    bbl: "3054490145",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "310",
    house_number_low: 310,
    house_number_high: 310,
    street: "4",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5449",
    lot: "145",
    lat: 40.624524,
    lng: -74.031245,
    geocode_quality: "exact"
  },
  {
    id: "a416cdd2-3516-49d3-baf2-85e69ca253d7",
    bbl: "3055450285",
    borough: "BROOKLYN",
    zip: "11210",
    house_number_raw: "380-388",
    house_number_low: 380,
    house_number_high: 388,
    street: "CORTELYOU",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "ARTICLES 14 & 15"
    ],
    block: "5545",
    lot: "285",
    lat: 40.636486,
    lng: -73.966383,
    geocode_quality: "exact"
  },
  {
    id: "3b965e87-64cd-45bc-bad7-ae8792c28d1f",
    bbl: "3056800420",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "271-275",
    house_number_low: 271,
    house_number_high: 275,
    street: "76",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5680",
    lot: "420",
    lat: 40.624621,
    lng: -74.024596,
    geocode_quality: "exact"
  },
  {
    id: "dd0eec28-fc86-49dc-9761-09f02b5e710e",
    bbl: "3058550125",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "208",
    house_number_low: 208,
    house_number_high: 208,
    street: "4",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5855",
    lot: "125",
    lat: 40.62735,
    lng: -74.035368,
    geocode_quality: "exact"
  },
  {
    id: "352bde22-79e7-4c9c-8c9a-c128ce2ef627",
    bbl: "3058710300",
    borough: "BROOKLYN",
    zip: "11232",
    house_number_raw: "306",
    house_number_low: 306,
    house_number_high: 306,
    street: "8",
    street_suffix: "AVENUE",
    secondary_address: "163 44 STREET",
    statuses: [
      "MULTIPLE DWELLING A",
      "COOP/CONDO PLAN FILE"
    ],
    block: "5871",
    lot: "300",
    lat: 40.648163,
    lng: -74.008947,
    geocode_quality: "exact"
  },
  {
    id: "3a5e5daf-bbf3-4b73-8403-07bb41a4fa35",
    bbl: "3059680155",
    borough: "BROOKLYN",
    zip: "11207",
    house_number_raw: "98",
    house_number_low: 98,
    house_number_high: 98,
    street: "EUCLID",
    street_suffix: "AVENUE",
    secondary_address: "297 ATLANTIC AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "5968",
    lot: "155",
    lat: 40.67482,
    lng: -73.893101,
    geocode_quality: "approximate"
  },
  {
    id: "577f5c6e-0d88-4f4b-8ab4-4cdde1cacf6d",
    bbl: "3059820241",
    borough: "BROOKLYN",
    zip: "11208",
    house_number_raw: "216",
    house_number_low: 216,
    house_number_high: 216,
    street: "EUCLID",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "NON-EVICT COOP/CONDO"
    ],
    block: "5982",
    lot: "241",
    lat: 40.670914,
    lng: -73.886299,
    geocode_quality: "exact"
  },
  {
    id: "06ee0898-5d6d-4c76-9d1e-1ba0a9d10c08",
    bbl: "3061030474",
    borough: "BROOKLYN",
    zip: "11206",
    house_number_raw: "113-121",
    house_number_low: 113,
    house_number_high: 121,
    street: "GRAHAM",
    street_suffix: "AVENUE",
    secondary_address: "11 METROPOLITAN AVENUE",
    statuses: [
      "421-A (1-15)"
    ],
    block: "6103",
    lot: "474",
    lat: 40.705653,
    lng: -73.953306,
    geocode_quality: "exact"
  },
  {
    id: "9274707a-ed9f-455b-80f3-1208d1b4f116",
    bbl: "3061830373",
    borough: "BROOKLYN",
    zip: "11232",
    house_number_raw: "611",
    house_number_low: 611,
    house_number_high: 611,
    street: "5",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6183",
    lot: "373",
    lat: 40.64724,
    lng: -74.016032,
    geocode_quality: "exact"
  },
  {
    id: "c7d3cde1-a983-4b8b-89d5-a72600022e0a",
    bbl: "3062180324",
    borough: "BROOKLYN",
    zip: "11210",
    house_number_raw: "436",
    house_number_low: 436,
    house_number_high: 436,
    street: "OCEAN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6218",
    lot: "324",
    lat: 40.638505,
    lng: -73.959462,
    geocode_quality: "exact"
  },
  {
    id: "699a3ede-db28-4d74-944a-86bf19e0b08d",
    bbl: "3062390027",
    borough: "BROOKLYN",
    zip: "11207",
    house_number_raw: "362",
    house_number_low: 362,
    house_number_high: 362,
    street: "LIBERTY",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (1-15)",
      "MULTIPLE DWELLING A"
    ],
    block: "6239",
    lot: "27",
    lat: 40.670306,
    lng: -73.879257,
    geocode_quality: "exact"
  },
  {
    id: "45f32e98-815f-41b6-8b43-4a4ff276e53a",
    bbl: "3063520436",
    borough: "BROOKLYN",
    zip: "11226",
    house_number_raw: "411",
    house_number_low: 411,
    house_number_high: 411,
    street: "FLATBUSH",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6352",
    lot: "436",
    lat: 40.636317,
    lng: -73.961692,
    geocode_quality: "exact"
  },
  {
    id: "d8626544-8640-49e3-91bd-fe887c282b44",
    bbl: "3064320477",
    borough: "BROOKLYN",
    zip: "11208",
    house_number_raw: "614-618",
    house_number_low: 614,
    house_number_high: 618,
    street: "ATLANTIC",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "NON-EVICT COOP/CONDO"
    ],
    block: "6432",
    lot: "477",
    lat: 40.66538,
    lng: -73.880541,
    geocode_quality: "exact"
  },
  {
    id: "7542f0d3-0966-45a6-b51f-6ffb7ed19fad",
    bbl: "3064570149",
    borough: "BROOKLYN",
    zip: "11225",
    house_number_raw: "387",
    house_number_low: 387,
    house_number_high: 387,
    street: "UNION",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "HPD"
    ],
    block: "6457",
    lot: "149",
    lat: 40.673712,
    lng: -73.945872,
    geocode_quality: "exact"
  },
  {
    id: "b9c4031d-cb8a-4838-87ed-d9114692556f",
    bbl: "3064760211",
    borough: "BROOKLYN",
    zip: "11208",
    house_number_raw: "509",
    house_number_low: 509,
    house_number_high: 509,
    street: "EUCLID",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6476",
    lot: "211",
    lat: 40.673396,
    lng: -73.875549,
    geocode_quality: "exact"
  },
  {
    id: "de4b5fd5-2250-4ecd-9087-916e4f212501",
    bbl: "3065460185",
    borough: "BROOKLYN",
    zip: "11232",
    house_number_raw: "384",
    house_number_low: 384,
    house_number_high: 384,
    street: "8",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "COOP/CONDO PLAN FILE"
    ],
    block: "6546",
    lot: "185",
    lat: 40.642126,
    lng: -74.017415,
    geocode_quality: "exact"
  },
  {
    id: "0c3122c5-825e-4bb1-960b-3673c2625920",
    bbl: "3065690219",
    borough: "BROOKLYN",
    zip: "11207",
    house_number_raw: "331",
    house_number_low: 331,
    house_number_high: 331,
    street: "LIBERTY",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6569",
    lot: "219",
    lat: 40.665878,
    lng: -73.874187,
    geocode_quality: "exact"
  },
  {
    id: "a0d733bb-5371-4776-96bc-78b692f6d2a8",
    bbl: "3066440214",
    borough: "BROOKLYN",
    zip: "11210",
    house_number_raw: "431",
    house_number_low: 431,
    house_number_high: 431,
    street: "E 21",
    street_suffix: "STREET",
    secondary_address: "206 OCEAN AVENUE",
    statuses: [
      "MULTIPLE DWELLING A",
      "J-51"
    ],
    block: "6644",
    lot: "214",
    lat: 40.635641,
    lng: -73.965596,
    geocode_quality: "exact"
  },
  {
    id: "7e72c700-a1c2-48ba-b461-4fa73299d728",
    bbl: "3066920077",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "52",
    house_number_low: 52,
    house_number_high: 52,
    street: "SHORE",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "420C",
      "MULTIPLE DWELLING B"
    ],
    block: "6692",
    lot: "77",
    lat: 40.622307,
    lng: -74.027399,
    geocode_quality: "exact"
  },
  {
    id: "803ff672-66ea-4406-9018-daa29b84a50f",
    bbl: "3067360122",
    borough: "BROOKLYN",
    zip: "11232",
    house_number_raw: "290",
    house_number_low: 290,
    house_number_high: 290,
    street: "5",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6736",
    lot: "122",
    lat: 40.647062,
    lng: -74.018033,
    geocode_quality: "exact"
  },
  {
    id: "b40fd544-31fa-4610-a467-2ac0a6f36dc3",
    bbl: "3067470215",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "268-276",
    house_number_low: 268,
    house_number_high: 276,
    street: "86",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "6747",
    lot: "215",
    lat: 40.627362,
    lng: -74.031921,
    geocode_quality: "exact"
  },
  {
    id: "6dd7d0f3-a8a2-4d1b-ac3d-cebda08c718f",
    bbl: "3067610044",
    borough: "BROOKLYN",
    zip: "11207",
    house_number_raw: "387",
    house_number_low: 387,
    house_number_high: 387,
    street: "EUCLID",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (1-15)",
      "MULTIPLE DWELLING A"
    ],
    block: "6761",
    lot: "44",
    lat: 40.671492,
    lng: -73.881918,
    geocode_quality: "exact"
  },
  {
    id: "ee3dd7d3-7bef-464c-aa05-3dec34473a76",
    bbl: "3068510217",
    borough: "BROOKLYN",
    zip: "11232",
    house_number_raw: "511",
    house_number_low: 511,
    house_number_high: 511,
    street: "5",
    street_suffix: "AVENUE",
    secondary_address: "75 44 STREET",
    statuses: [
      "421-A (1-15)"
    ],
    block: "6851",
    lot: "217",
    lat: 40.646355,
    lng: -74.012462,
    geocode_quality: "exact"
  },
  {
    id: "8a3e51e8-22f2-4733-83ce-2f2598324a5e",
    bbl: "3069240101",
    borough: "BROOKLYN",
    zip: "11207",
    house_number_raw: "329",
    house_number_low: 329,
    house_number_high: 329,
    street: "EUCLID",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6924",
    lot: "101",
    lat: 40.666293,
    lng: -73.878093,
    geocode_quality: "exact"
  },
  {
    id: "db55d069-0eae-4334-8774-d23b9229b359",
    bbl: "3070440300",
    borough: "BROOKLYN",
    zip: "11226",
    house_number_raw: "125",
    house_number_low: 125,
    house_number_high: 125,
    street: "OCEAN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "7044",
    lot: "300",
    lat: 40.635637,
    lng: -73.964588,
    geocode_quality: "exact"
  },
  {
    id: "337e9f1d-0bfa-4cdc-8406-47d335062ced",
    bbl: "3070990411",
    borough: "BROOKLYN",
    zip: "11225",
    house_number_raw: "537",
    house_number_low: 537,
    house_number_high: 537,
    street: "ROGERS",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "7099",
    lot: "411",
    lat: 40.667134,
    lng: -73.948842,
    geocode_quality: "exact"
  },
  {
    id: "16da2e79-faca-487b-a5bd-9f900f8204a3",
    bbl: "3071970195",
    borough: "BROOKLYN",
    zip: "11229",
    house_number_raw: "556",
    house_number_low: 556,
    house_number_high: 556,
    street: "AVENUE Z",
    street_suffix: null,
    secondary_address: null,
    statuses: [
      "ARTICLES 14 & 15"
    ],
    block: "7197",
    lot: "195",
    lat: 40.592382,
    lng: -73.938431,
    geocode_quality: "exact"
  },
  {
    id: "9d66a514-49a2-47fa-9fad-db52b5595b2c",
    bbl: "3073420003",
    borough: "BROOKLYN",
    zip: "11226",
    house_number_raw: "155",
    house_number_low: 155,
    house_number_high: 155,
    street: "CORTELYOU",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "7342",
    lot: "3",
    lat: 40.636973,
    lng: -73.968922,
    geocode_quality: "exact"
  },
  {
    id: "76b3898e-f05f-4e5f-a079-fcecb02150fe",
    bbl: "3074800134",
    borough: "BROOKLYN",
    zip: "11225",
    house_number_raw: "598",
    house_number_low: 598,
    house_number_high: 598,
    street: "PRESIDENT",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "COOP/CONDO PLAN FILE"
    ],
    block: "7480",
    lot: "134",
    lat: 40.670708,
    lng: -73.940788,
    geocode_quality: "exact"
  },
  {
    id: "84e55749-2930-4650-8691-48b9fb3ba74e",
    bbl: "3074830141",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "101",
    house_number_low: 101,
    house_number_high: 101,
    street: "86",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "7483",
    lot: "141",
    lat: 40.631744,
    lng: -74.03626,
    geocode_quality: "exact"
  },
  {
    id: "30e37201-9017-4b3c-910f-961583e6103c",
    bbl: "3075060270",
    borough: "BROOKLYN",
    zip: "11210",
    house_number_raw: "223-227",
    house_number_low: 223,
    house_number_high: 227,
    street: "FLATBUSH",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-G",
      "ARTICLE 11"
    ],
    block: "7506",
    lot: "270",
    lat: 40.638037,
    lng: -73.967292,
    geocode_quality: "exact"
  },
  {
    id: "7c06f556-3bce-4551-a1ff-6d890c720172",
    bbl: "3077720097",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "30",
    house_number_low: 30,
    house_number_high: 30,
    street: "76",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "7772",
    lot: "97",
    lat: 40.631791,
    lng: -74.03064,
    geocode_quality: "exact"
  },
  {
    id: "93ebb948-092a-4b8e-b5b1-dcbfcdb4cdd5",
    bbl: "3078420182",
    borough: "BROOKLYN",
    zip: "11220",
    house_number_raw: "579-583",
    house_number_low: 579,
    house_number_high: 583,
    street: "44",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "J-51",
      "MULTIPLE DWELLING A"
    ],
    block: "7842",
    lot: "182",
    lat: 40.6419,
    lng: -74.017606,
    geocode_quality: "exact"
  },
  {
    id: "f6cf3c0b-e657-41d9-b5a1-140835d725a1",
    bbl: "3078920151",
    borough: "BROOKLYN",
    zip: "11235",
    house_number_raw: "32",
    house_number_low: 32,
    house_number_high: 32,
    street: "E 17",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "NON-EVICT COOP/CONDO"
    ],
    block: "7892",
    lot: "151",
    lat: 40.585297,
    lng: -73.942582,
    geocode_quality: "exact"
  },
  {
    id: "2941b5db-77b8-4957-9340-61bdcc313357",
    bbl: "3079780323",
    borough: "BROOKLYN",
    zip: "11229",
    house_number_raw: "106",
    house_number_low: 106,
    house_number_high: 106,
    street: "SHEEPSHEAD BAY",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "7978",
    lot: "323",
    lat: 40.586957,
    lng: -73.943144,
    geocode_quality: "exact"
  },
  {
    id: "53b58d67-923e-4743-96c0-6420a4fbac37",
    bbl: "3079870251",
    borough: "BROOKLYN",
    zip: "11235",
    house_number_raw: "534",
    house_number_low: 534,
    house_number_high: 534,
    street: "OCEAN",
    street_suffix: "PARKWAY",
    secondary_address: "89 OCEAN PARKWAY",
    statuses: [
      "420C"
    ],
    block: "7987",
    lot: "251",
    lat: 40.584214,
    lng: -73.941776,
    geocode_quality: "exact"
  },
  {
    id: "c06da68d-c5f0-4d01-8a1f-f87cb4306bde",
    bbl: "3080750049",
    borough: "BROOKLYN",
    zip: "11207",
    house_number_raw: "475",
    house_number_low: 475,
    house_number_high: 475,
    street: "PITKIN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "GARDEN COMPLEX",
      "MULTIPLE DWELLING A"
    ],
    block: "8075",
    lot: "49",
    lat: 40.67067,
    lng: -73.875383,
    geocode_quality: "exact"
  },
  {
    id: "74983e28-1a2a-48ee-8e12-46ad84a5ec2a",
    bbl: "3081370046",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "109",
    house_number_low: 109,
    house_number_high: 109,
    street: "4",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "8137",
    lot: "46",
    lat: 40.625399,
    lng: -74.030979,
    geocode_quality: "exact"
  },
  {
    id: "e327f906-4211-4226-a642-46afa37c815d",
    bbl: "3081680070",
    borough: "BROOKLYN",
    zip: "11229",
    house_number_raw: "159",
    house_number_low: 159,
    house_number_high: 159,
    street: "AVENUE Z",
    street_suffix: null,
    secondary_address: "300 AVENUE Z",
    statuses: [
      "421-A (16)"
    ],
    block: "8168",
    lot: "70",
    lat: 40.587753,
    lng: -73.938469,
    geocode_quality: "exact"
  },
  {
    id: "cdbc0bd4-66fa-4c63-aa86-cd84056883c6",
    bbl: "3083910139",
    borough: "BROOKLYN",
    zip: "11211",
    house_number_raw: "445",
    house_number_low: 445,
    house_number_high: 445,
    street: "S 3",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "NON-EVICT COOP/CONDO"
    ],
    block: "8391",
    lot: "139",
    lat: 40.702767,
    lng: -73.954592,
    geocode_quality: "exact"
  },
  {
    id: "cbea9d4a-f0af-4de7-8d88-dd0d7ace9393",
    bbl: "3084890310",
    borough: "BROOKLYN",
    zip: "11232",
    house_number_raw: "168",
    house_number_low: 168,
    house_number_high: 168,
    street: "44",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "8489",
    lot: "310",
    lat: 40.647861,
    lng: -74.019221,
    geocode_quality: "exact"
  },
  {
    id: "729eb05b-784a-41ea-b7d7-5c2117a278d9",
    bbl: "3086720143",
    borough: "BROOKLYN",
    zip: "11229",
    house_number_raw: "467",
    house_number_low: 467,
    house_number_high: 467,
    street: "AVENUE Z",
    street_suffix: null,
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "8672",
    lot: "143",
    lat: 40.583097,
    lng: -73.93947,
    geocode_quality: "exact"
  },
  {
    id: "638c9831-2310-4438-9776-983e6aadba58",
    bbl: "3087770383",
    borough: "BROOKLYN",
    zip: "11220",
    house_number_raw: "188",
    house_number_low: 188,
    house_number_high: 188,
    street: "5",
    street_suffix: "AVENUE",
    secondary_address: "104 5 AVENUE",
    statuses: [
      "MULTIPLE DWELLING B",
      "MULTIPLE DWELLING A"
    ],
    block: "8777",
    lot: "383",
    lat: 40.641079,
    lng: -74.011151,
    geocode_quality: "exact"
  },
  {
    id: "768b5f97-0111-4ce9-b0eb-f91187d61861",
    bbl: "3091470181",
    borough: "BROOKLYN",
    zip: "11225",
    house_number_raw: "292",
    house_number_low: 292,
    house_number_high: 292,
    street: "NOSTRAND",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "9147",
    lot: "181",
    lat: 40.672147,
    lng: -73.948401,
    geocode_quality: "exact"
  },
  {
    id: "76b49f79-a7c8-414d-bdb2-22235b8608ca",
    bbl: "3093850078",
    borough: "BROOKLYN",
    zip: "11229",
    house_number_raw: "606",
    house_number_low: 606,
    house_number_high: 606,
    street: "AVENUE Z",
    street_suffix: null,
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "9385",
    lot: "78",
    lat: 40.589933,
    lng: -73.945632,
    geocode_quality: "exact"
  },
  {
    id: "d3011665-e7f5-4866-81e3-043fbe26c69a",
    bbl: "3095520462",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "387-391",
    house_number_low: 387,
    house_number_high: 391,
    street: "SHORE",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9552",
    lot: "462",
    lat: 40.631407,
    lng: -74.03259,
    geocode_quality: "exact"
  },
  {
    id: "baeb7772-14a7-48d9-84b8-ccb47327d123",
    bbl: "3095960346",
    borough: "BROOKLYN",
    zip: "11209",
    house_number_raw: "449",
    house_number_low: 449,
    house_number_high: 449,
    street: "86",
    street_suffix: "STREET",
    secondary_address: "248 4 AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9596",
    lot: "346",
    lat: 40.625477,
    lng: -74.034046,
    geocode_quality: "exact"
  },
  {
    id: "7008a09e-f4c4-4759-9382-63468fe74e98",
    bbl: "3097280336",
    borough: "BROOKLYN",
    zip: "11207",
    house_number_raw: "269",
    house_number_low: 269,
    house_number_high: 269,
    street: "PITKIN",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51",
      "MULTIPLE DWELLING A"
    ],
    block: "9728",
    lot: "336",
    lat: 40.665386,
    lng: -73.878442,
    geocode_quality: "exact"
  },
  {
    id: "d91fb5ab-d657-4995-af94-b5ce754f9335",
    bbl: "3097790253",
    borough: "BROOKLYN",
    zip: "11207",
    house_number_raw: "411",
    house_number_low: 411,
    house_number_high: 411,
    street: "EUCLID",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "NON-EVICT COOP/CONDO",
      "GARDEN COMPLEX"
    ],
    block: "9779",
    lot: "253",
    lat: 40.669667,
    lng: -73.877539,
    geocode_quality: "exact"
  },
  {
    id: "79b5d8f1-49c8-461d-8e6f-1ab5836540fe",
    bbl: "4002840297",
    borough: "QUEENS",
    zip: "11417",
    house_number_raw: "315",
    house_number_low: 315,
    house_number_high: 315,
    street: "LIBERTY",
    street_suffix: "AVENUE",
    secondary_address: "372 101 AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "284",
    lot: "297",
    lat: 40.675023,
    lng: -73.856518,
    geocode_quality: "approximate"
  },
  {
    id: "eb06a9f9-8186-497a-b77f-11892bd038ea",
    bbl: "4004090419",
    borough: "QUEENS",
    zip: "11106",
    house_number_raw: "230",
    house_number_low: 230,
    house_number_high: 230,
    street: "30",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "409",
    lot: "419",
    lat: 40.759024,
    lng: -73.921306,
    geocode_quality: "exact"
  },
  {
    id: "a104ef8d-e536-4087-894a-9a6dbeaea065",
    bbl: "4005250387",
    borough: "QUEENS",
    zip: "11373",
    house_number_raw: "425",
    house_number_low: 425,
    house_number_high: 425,
    street: "37",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "HPD"
    ],
    block: "525",
    lot: "387",
    lat: 40.753244,
    lng: -73.878848,
    geocode_quality: "exact"
  },
  {
    id: "f72a5eaf-a31d-414f-a47f-c7b5fd68085f",
    bbl: "4005870236",
    borough: "QUEENS",
    zip: "11435",
    house_number_raw: "270",
    house_number_low: 270,
    house_number_high: 270,
    street: "SUTPHIN",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "587",
    lot: "236",
    lat: 40.711942,
    lng: -73.780777,
    geocode_quality: "approximate"
  },
  {
    id: "c2fb9af6-6b96-46ed-b1dd-e53fc8aaad8c",
    bbl: "4006090223",
    borough: "QUEENS",
    zip: "11692",
    house_number_raw: "77-26",
    house_number_low: null,
    house_number_high: null,
    street: "MOTT",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "MULTIPLE DWELLING B"
    ],
    block: "609",
    lot: "223",
    lat: 40.600297,
    lng: -73.755062,
    geocode_quality: "exact"
  },
  {
    id: "0f7a9daf-5d87-4acd-a566-1a00e4467b37",
    bbl: "4008530058",
    borough: "QUEENS",
    zip: "11355",
    house_number_raw: "427-433",
    house_number_low: 427,
    house_number_high: 433,
    street: "ROOSEVELT",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (16)"
    ],
    block: "853",
    lot: "58",
    lat: 40.756049,
    lng: -73.82736,
    geocode_quality: "exact"
  },
  {
    id: "5025531e-3f0c-43fd-9125-7bbad284620b",
    bbl: "4009160385",
    borough: "QUEENS",
    zip: "11691",
    house_number_raw: "130-78",
    house_number_low: null,
    house_number_high: null,
    street: "SEAGIRT",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "SECTION 610 OF PHFL",
      "421-A (1-15)"
    ],
    block: "916",
    lot: "385",
    lat: 40.603963,
    lng: -73.755586,
    geocode_quality: "exact"
  },
  {
    id: "c8f6af28-a2c1-4387-b7c4-1bb42c635e63",
    bbl: "4010010014",
    borough: "QUEENS",
    zip: "11354",
    house_number_raw: "509",
    house_number_low: 509,
    house_number_high: 509,
    street: "MAIN",
    street_suffix: "STREET",
    secondary_address: "229 SANFORD AVENUE",
    statuses: [
      "J-51"
    ],
    block: "1001",
    lot: "14",
    lat: 40.765004,
    lng: -73.836124,
    geocode_quality: "exact"
  },
  {
    id: "3c35313b-27b2-4c19-b8ab-4e066ff032d5",
    bbl: "4010490232",
    borough: "QUEENS",
    zip: "11417",
    house_number_raw: "90-56",
    house_number_low: null,
    house_number_high: null,
    street: "101",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (16)",
      "MULTIPLE DWELLING A"
    ],
    block: "1049",
    lot: "232",
    lat: 40.690072,
    lng: -73.839772,
    geocode_quality: "approximate"
  },
  {
    id: "85128c70-bb45-40ef-b2b7-ee724421174e",
    bbl: "4011740397",
    borough: "QUEENS",
    zip: "11435",
    house_number_raw: "389-395",
    house_number_low: 389,
    house_number_high: 395,
    street: "SUTPHIN",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1174",
    lot: "397",
    lat: 40.706696,
    lng: -73.783516,
    geocode_quality: "exact"
  },
  {
    id: "e1e003d7-6b03-4ad1-9f84-d0ddbb3b7b81",
    bbl: "4011860455",
    borough: "QUEENS",
    zip: "11103",
    house_number_raw: "357-361",
    house_number_low: 357,
    house_number_high: 361,
    street: "31",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1186",
    lot: "455",
    lat: 40.768703,
    lng: -73.916785,
    geocode_quality: "exact"
  },
  {
    id: "1d41b343-d523-4bed-ae01-1501d5b2efe0",
    bbl: "4014550372",
    borough: "QUEENS",
    zip: "11354",
    house_number_raw: "224-228",
    house_number_low: 224,
    house_number_high: 228,
    street: "KISSENA",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "HOTEL"
    ],
    block: "1455",
    lot: "372",
    lat: 40.757451,
    lng: -73.833598,
    geocode_quality: "exact"
  },
  {
    id: "a308d79b-8dcf-41c9-9df8-fb37972ce6bb",
    bbl: "4015300235",
    borough: "QUEENS",
    zip: "11417",
    house_number_raw: "59-97",
    house_number_low: null,
    house_number_high: null,
    street: "ROCKAWAY",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "GARDEN COMPLEX",
      "MULTIPLE DWELLING A"
    ],
    block: "1530",
    lot: "235",
    lat: 40.67835,
    lng: -73.849576,
    geocode_quality: "exact"
  },
  {
    id: "3a6ae75a-1f63-4f70-aff1-b1d1b2485228",
    bbl: "4016340013",
    borough: "QUEENS",
    zip: "11691",
    house_number_raw: "50",
    house_number_low: 50,
    house_number_high: 50,
    street: "SEAGIRT",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING B"
    ],
    block: "1634",
    lot: "13",
    lat: 40.59929,
    lng: -73.765304,
    geocode_quality: "exact"
  },
  {
    id: "000c961a-d1c0-4f56-8e7e-12d058cd637e",
    bbl: "4016650386",
    borough: "QUEENS",
    zip: "11375",
    house_number_raw: "42",
    house_number_low: 42,
    house_number_high: 42,
    street: "QUEENS",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "1665",
    lot: "386",
    lat: 40.722376,
    lng: -73.858454,
    geocode_quality: "exact"
  },
  {
    id: "48e12d23-746f-42bf-8b44-0f3a1b46d73f",
    bbl: "4016680133",
    borough: "QUEENS",
    zip: "11354",
    house_number_raw: "547",
    house_number_low: 547,
    house_number_high: 547,
    street: "ROOSEVELT",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING B"
    ],
    block: "1668",
    lot: "133",
    lat: 40.760397,
    lng: -73.837052,
    geocode_quality: "exact"
  },
  {
    id: "4aab5ce4-d21e-4336-83fd-3457dcda2d4d",
    bbl: "4018260399",
    borough: "QUEENS",
    zip: "11692",
    house_number_raw: "123-16",
    house_number_low: null,
    house_number_high: null,
    street: "MOTT",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1826",
    lot: "399",
    lat: 40.592369,
    lng: -73.75203,
    geocode_quality: "approximate"
  },
  {
    id: "1d82a26e-a8a3-4e55-9743-aa40f502d01b",
    bbl: "4018920032",
    borough: "QUEENS",
    zip: "11102",
    house_number_raw: "69-53",
    house_number_low: null,
    house_number_high: null,
    street: "BROADWAY",
    street_suffix: null,
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1892",
    lot: "32",
    lat: 40.769548,
    lng: -73.918299,
    geocode_quality: "exact"
  },
  {
    id: "0012990a-0cc4-4609-9363-5f34eb4fe607",
    bbl: "4020070447",
    borough: "QUEENS",
    zip: "11354",
    house_number_raw: "61-71",
    house_number_low: null,
    house_number_high: null,
    street: "SANFORD",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "ART V"
    ],
    block: "2007",
    lot: "447",
    lat: 40.761365,
    lng: -73.836046,
    geocode_quality: "exact"
  },
  {
    id: "6ac899a7-eb17-43a0-9f8d-84fd13be7d73",
    bbl: "4020140250",
    borough: "QUEENS",
    zip: "11374",
    house_number_raw: "52-88",
    house_number_low: null,
    house_number_high: null,
    street: "AUSTIN",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2014",
    lot: "250",
    lat: 40.722042,
    lng: -73.862845,
    geocode_quality: "exact"
  },
  {
    id: "58d2b4b3-1e12-476b-a9c2-b925e5662f70",
    bbl: "4020320187",
    borough: "QUEENS",
    zip: "11417",
    house_number_raw: "126-14",
    house_number_low: null,
    house_number_high: null,
    street: "101",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "EVICT COOP/CONDO",
      "SECTION 610 OF PHFL"
    ],
    block: "2032",
    lot: "187",
    lat: 40.676267,
    lng: -73.851389,
    geocode_quality: "exact"
  },
  {
    id: "eeb206fd-6446-4bc0-bcdc-fc0c5ee3d386",
    bbl: "4020780124",
    borough: "QUEENS",
    zip: "11374",
    house_number_raw: "455",
    house_number_low: 455,
    house_number_high: 455,
    street: "YELLOWSTONE",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2078",
    lot: "124",
    lat: 40.720445,
    lng: -73.867438,
    geocode_quality: "exact"
  },
  {
    id: "0b9c10b1-6967-483f-a05b-c9ea333044fa",
    bbl: "4021860462",
    borough: "QUEENS",
    zip: "11435",
    house_number_raw: "32-90/32-96",
    house_number_low: null,
    house_number_high: null,
    street: "SUTPHIN",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2186",
    lot: "462",
    lat: 40.696592,
    lng: -73.790747,
    geocode_quality: "approximate"
  },
  {
    id: "b1eeb1bd-3a75-4feb-99cc-4b5294f8072d",
    bbl: "4022500258",
    borough: "QUEENS",
    zip: "11375",
    house_number_raw: "86-94",
    house_number_low: 86,
    house_number_high: 94,
    street: "AUSTIN",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2250",
    lot: "258",
    lat: 40.726926,
    lng: -73.867605,
    geocode_quality: "exact"
  },
  {
    id: "9f5978b5-8cb4-4183-abf1-e115fa9574c4",
    bbl: "4024440158",
    borough: "QUEENS",
    zip: "11373",
    house_number_raw: "46-46",
    house_number_low: null,
    house_number_high: null,
    street: "82",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "COOP/CONDO PLAN FILE"
    ],
    block: "2444",
    lot: "158",
    lat: 40.755829,
    lng: -73.884337,
    geocode_quality: "exact"
  },
  {
    id: "c0e8863f-787e-40be-97bb-7d4d5c9640c7",
    bbl: "4024580174",
    borough: "QUEENS",
    zip: "11106",
    house_number_raw: "33-79",
    house_number_low: null,
    house_number_high: null,
    street: "BROADWAY",
    street_suffix: null,
    secondary_address: null,
    statuses: [
      "421-A (1-15)",
      "MULTIPLE DWELLING A"
    ],
    block: "2458",
    lot: "174",
    lat: 40.769306,
    lng: -73.911561,
    geocode_quality: "approximate"
  },
  {
    id: "e929f81c-7d0e-4d0a-a02d-2b546549d81c",
    bbl: "4026780185",
    borough: "QUEENS",
    zip: "11374",
    house_number_raw: "42",
    house_number_low: 42,
    house_number_high: 42,
    street: "QUEENS",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "ARTICLES 14 & 15"
    ],
    block: "2678",
    lot: "185",
    lat: 40.723803,
    lng: -73.864804,
    geocode_quality: "exact"
  },
  {
    id: "960d54eb-1ae0-4560-9021-ca6454d0b7d3",
    bbl: "4027120383",
    borough: "QUEENS",
    zip: "11691",
    house_number_raw: "76-68",
    house_number_low: null,
    house_number_high: null,
    street: "SEAGIRT",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "ARTICLE 11"
    ],
    block: "2712",
    lot: "383",
    lat: 40.599004,
    lng: -73.764159,
    geocode_quality: "exact"
  },
  {
    id: "a2073170-116f-46e3-8a9d-2837eae9d514",
    bbl: "4027670035",
    borough: "QUEENS",
    zip: "11435",
    house_number_raw: "36-38",
    house_number_low: 36,
    house_number_high: 38,
    street: "HILLSIDE",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "2767",
    lot: "35",
    lat: 40.703914,
    lng: -73.787553,
    geocode_quality: "exact"
  },
  {
    id: "11ed127c-cf4f-4e21-9e1e-8bd996e3f553",
    bbl: "4031860205",
    borough: "QUEENS",
    zip: "11374",
    house_number_raw: "612-616",
    house_number_low: 612,
    house_number_high: 616,
    street: "YELLOWSTONE",
    street_suffix: "BOULEVARD",
    secondary_address: "220 QUEENS BOULEVARD",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3186",
    lot: "205",
    lat: 40.722147,
    lng: -73.857609,
    geocode_quality: "exact"
  },
  {
    id: "302850cd-df74-466f-8379-58c4d58992f9",
    bbl: "4032010244",
    borough: "QUEENS",
    zip: "11375",
    house_number_raw: "638",
    house_number_low: 638,
    house_number_high: 638,
    street: "AUSTIN",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "3201",
    lot: "244",
    lat: 40.726088,
    lng: -73.856292,
    geocode_quality: "exact"
  },
  {
    id: "2eb32dd2-a657-487b-9919-ff5ed70c4aa9",
    bbl: "4034810323",
    borough: "QUEENS",
    zip: "11102",
    house_number_raw: "344",
    house_number_low: 344,
    house_number_high: 344,
    street: "30",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (16)"
    ],
    block: "3481",
    lot: "323",
    lat: 40.768725,
    lng: -73.923264,
    geocode_quality: "exact"
  },
  {
    id: "7a441f01-3166-4762-af8a-e9c43621b892",
    bbl: "4035530266",
    borough: "QUEENS",
    zip: "11691",
    house_number_raw: "301-303",
    house_number_low: 301,
    house_number_high: 303,
    street: "BEACH 20",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3553",
    lot: "266",
    lat: 40.599637,
    lng: -73.757014,
    geocode_quality: "exact"
  },
  {
    id: "62d326a1-c417-46a5-8749-e3677775e42f",
    bbl: "4037600302",
    borough: "QUEENS",
    zip: "11417",
    house_number_raw: "581",
    house_number_low: 581,
    house_number_high: 581,
    street: "LIBERTY",
    street_suffix: "AVENUE",
    secondary_address: "220 101 AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "3760",
    lot: "302",
    lat: 40.675775,
    lng: -73.840103,
    geocode_quality: "exact"
  },
  {
    id: "90ee805a-0283-462a-8c17-2cc86fa18faf",
    bbl: "4041320247",
    borough: "QUEENS",
    zip: "11375",
    house_number_raw: "191-193",
    house_number_low: 191,
    house_number_high: 193,
    street: "QUEENS",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "4132",
    lot: "247",
    lat: 40.730897,
    lng: -73.868959,
    geocode_quality: "exact"
  },
  {
    id: "eb0d6a57-40b6-4435-969b-d3e5458afe1f",
    bbl: "4046950223",
    borough: "QUEENS",
    zip: "11373",
    house_number_raw: "620",
    house_number_low: 620,
    house_number_high: 620,
    street: "NORTHERN",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "4695",
    lot: "223",
    lat: 40.752232,
    lng: -73.880114,
    geocode_quality: "exact"
  },
  {
    id: "2b81b684-0be1-44b4-9ecd-b2b16c80ded7",
    bbl: "4049380075",
    borough: "QUEENS",
    zip: "11435",
    house_number_raw: "362",
    house_number_low: 362,
    house_number_high: 362,
    street: "ARCHER",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "4938",
    lot: "75",
    lat: 40.702871,
    lng: -73.795637,
    geocode_quality: "exact"
  },
  {
    id: "140a7334-c0ad-460b-b6ad-3bae23df44c2",
    bbl: "4052250444",
    borough: "QUEENS",
    zip: "11372",
    house_number_raw: "122-32",
    house_number_low: null,
    house_number_high: null,
    street: "NORTHERN",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "J-51"
    ],
    block: "5225",
    lot: "444",
    lat: 40.757656,
    lng: -73.884444,
    geocode_quality: "exact"
  },
  {
    id: "083c5a3e-04ce-41ea-b1f3-d56cf9cd3e16",
    bbl: "4052700058",
    borough: "QUEENS",
    zip: "11416",
    house_number_raw: "40",
    house_number_low: 40,
    house_number_high: 40,
    street: "ROCKAWAY",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "COOP/CONDO PLAN FILE",
      "MULTIPLE DWELLING A"
    ],
    block: "5270",
    lot: "58",
    lat: 40.681525,
    lng: -73.850966,
    geocode_quality: "exact"
  },
  {
    id: "475a33e5-e6e0-40e3-b77e-b57d64aa5501",
    bbl: "4053700415",
    borough: "QUEENS",
    zip: "11372",
    house_number_raw: "32-54/32-62",
    house_number_low: null,
    house_number_high: null,
    street: "ROOSEVELT",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "5370",
    lot: "415",
    lat: 40.750397,
    lng: -73.888314,
    geocode_quality: "exact"
  },
  {
    id: "61bea3a9-ad2b-414d-a9e0-c83b3bf579c0",
    bbl: "4057380261",
    borough: "QUEENS",
    zip: "11374",
    house_number_raw: "91-68",
    house_number_low: null,
    house_number_high: null,
    street: "63",
    street_suffix: "DRIVE",
    secondary_address: null,
    statuses: [
      "GARDEN COMPLEX",
      "MULTIPLE DWELLING A"
    ],
    block: "5738",
    lot: "261",
    lat: 40.720661,
    lng: -73.866824,
    geocode_quality: "exact"
  },
  {
    id: "e981cb9d-68e9-49d8-906c-defa4bb3b4c6",
    bbl: "4058560042",
    borough: "QUEENS",
    zip: "11416",
    house_number_raw: "359",
    house_number_low: 359,
    house_number_high: 359,
    street: "ROCKAWAY",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "5856",
    lot: "42",
    lat: 40.677705,
    lng: -73.848634,
    geocode_quality: "exact"
  },
  {
    id: "87398201-c572-4594-b647-44afa91d482a",
    bbl: "4063320091",
    borough: "QUEENS",
    zip: "11355",
    house_number_raw: "65-03",
    house_number_low: null,
    house_number_high: null,
    street: "KISSENA",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6332",
    lot: "91",
    lat: 40.762837,
    lng: -73.831961,
    geocode_quality: "exact"
  },
  {
    id: "c94fe603-ca78-4493-849f-c2a260268295",
    bbl: "4064950412",
    borough: "QUEENS",
    zip: "11102",
    house_number_raw: "106",
    house_number_low: 106,
    house_number_high: 106,
    street: "31",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "6495",
    lot: "412",
    lat: 40.760489,
    lng: -73.914106,
    geocode_quality: "approximate"
  },
  {
    id: "f017ed9b-1288-4327-9a28-06b386159214",
    bbl: "4065000473",
    borough: "QUEENS",
    zip: "11355",
    house_number_raw: "73-79",
    house_number_low: null,
    house_number_high: null,
    street: "ROOSEVELT",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "NON-EVICT COOP/CONDO"
    ],
    block: "6500",
    lot: "473",
    lat: 40.756329,
    lng: -73.830744,
    geocode_quality: "exact"
  },
  {
    id: "26f1e1e7-fb57-46af-af73-eeeec07b45f6",
    bbl: "4066660317",
    borough: "QUEENS",
    zip: "11373",
    house_number_raw: "154-53",
    house_number_low: null,
    house_number_high: null,
    street: "ROOSEVELT",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "GARDEN COMPLEX"
    ],
    block: "6666",
    lot: "317",
    lat: 40.760755,
    lng: -73.887203,
    geocode_quality: "exact"
  },
  {
    id: "e0d057ce-4d1e-4f2f-9b45-92915e04434a",
    bbl: "4067710020",
    borough: "QUEENS",
    zip: "11416",
    house_number_raw: "461",
    house_number_low: 461,
    house_number_high: 461,
    street: "LIBERTY",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "6771",
    lot: "20",
    lat: 40.676039,
    lng: -73.840206,
    geocode_quality: "exact"
  },
  {
    id: "576cf7f4-5b3f-4592-a982-55fbaf4512f3",
    bbl: "4068480425",
    borough: "QUEENS",
    zip: "11102",
    house_number_raw: "133-17/133-23",
    house_number_low: null,
    house_number_high: null,
    street: "CRESCENT",
    street_suffix: "STREET",
    secondary_address: "194 31 AVENUE",
    statuses: [
      "J-51"
    ],
    block: "6848",
    lot: "425",
    lat: 40.764016,
    lng: -73.919472,
    geocode_quality: "exact"
  },
  {
    id: "125e8a23-2f3c-4493-87ef-29641fb8e42b",
    bbl: "4068770290",
    borough: "QUEENS",
    zip: "11373",
    house_number_raw: "88-04",
    house_number_low: null,
    house_number_high: null,
    street: "82",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "J-51",
      "MULTIPLE DWELLING A"
    ],
    block: "6877",
    lot: "290",
    lat: 40.751081,
    lng: -73.884166,
    geocode_quality: "exact"
  },
  {
    id: "1cba4d5f-57af-4509-9ec7-ca533c804b53",
    bbl: "4071850259",
    borough: "QUEENS",
    zip: "11432",
    house_number_raw: "201",
    house_number_low: 201,
    house_number_high: 201,
    street: "ARCHER",
    street_suffix: "AVENUE",
    secondary_address: "235 SUTPHIN BOULEVARD",
    statuses: [
      "MULTIPLE DWELLING B"
    ],
    block: "7185",
    lot: "259",
    lat: 40.701488,
    lng: -73.782621,
    geocode_quality: "exact"
  },
  {
    id: "bff72a6c-bf4d-4c40-8b23-631a9148eae1",
    bbl: "4073000301",
    borough: "QUEENS",
    zip: "11102",
    house_number_raw: "101-48/101-52",
    house_number_low: null,
    house_number_high: null,
    street: "BROADWAY",
    street_suffix: null,
    secondary_address: "58 30 AVENUE",
    statuses: [
      "420C"
    ],
    block: "7300",
    lot: "301",
    lat: 40.75927,
    lng: -73.917958,
    geocode_quality: "exact"
  },
  {
    id: "d041d379-304c-4d58-a55d-309aed9e2baf",
    bbl: "4079290043",
    borough: "QUEENS",
    zip: "11354",
    house_number_raw: "97-18/97-24",
    house_number_low: null,
    house_number_high: null,
    street: "KISSENA",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "7929",
    lot: "43",
    lat: 40.769107,
    lng: -73.832725,
    geocode_quality: "approximate"
  },
  {
    id: "5a682244-e264-42c5-8090-513cfa8104f2",
    bbl: "4082900198",
    borough: "QUEENS",
    zip: "11355",
    house_number_raw: "44-01",
    house_number_low: null,
    house_number_high: null,
    street: "SANFORD",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "SECTION 610 OF PHFL",
      "421-A (1-15)"
    ],
    block: "8290",
    lot: "198",
    lat: 40.770991,
    lng: -73.816535,
    geocode_quality: "approximate"
  },
  {
    id: "bf90d4ae-4c48-49c5-acd5-f7dee823f8e5",
    bbl: "4086110015",
    borough: "QUEENS",
    zip: "11417",
    house_number_raw: "135-85/135-89",
    house_number_low: null,
    house_number_high: null,
    street: "ROCKAWAY",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "421-A (16)"
    ],
    block: "8611",
    lot: "15",
    lat: 40.681347,
    lng: -73.840348,
    geocode_quality: "exact"
  },
  {
    id: "20a55230-952b-4233-a6bf-f0bb44f58502",
    bbl: "4088890223",
    borough: "QUEENS",
    zip: "11692",
    house_number_raw: "141-25",
    house_number_low: null,
    house_number_high: null,
    street: "BEACH 20",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "NON-EVICT COOP/CONDO",
      "HPD"
    ],
    block: "8889",
    lot: "223",
    lat: 40.595621,
    lng: -73.766463,
    geocode_quality: "exact"
  },
  {
    id: "d255ac91-ce17-4b9e-b638-8f18ac8b9c0f",
    bbl: "4089230309",
    borough: "QUEENS",
    zip: "11106",
    house_number_raw: "59-80",
    house_number_low: null,
    house_number_high: null,
    street: "BROADWAY",
    street_suffix: null,
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING B",
      "MULTIPLE DWELLING A"
    ],
    block: "8923",
    lot: "309",
    lat: 40.759399,
    lng: -73.925409,
    geocode_quality: "exact"
  },
  {
    id: "a980da30-b2d4-4d53-9565-2f4e590b4f05",
    bbl: "4090310099",
    borough: "QUEENS",
    zip: "11355",
    house_number_raw: "107-80",
    house_number_low: null,
    house_number_high: null,
    street: "SANFORD",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9031",
    lot: "99",
    lat: 40.761312,
    lng: -73.835874,
    geocode_quality: "exact"
  },
  {
    id: "64a425d7-2706-44ea-9fc9-14e201c375c4",
    bbl: "4093680019",
    borough: "QUEENS",
    zip: "11416",
    house_number_raw: "116-69",
    house_number_low: null,
    house_number_high: null,
    street: "LIBERTY",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9368",
    lot: "19",
    lat: 40.677556,
    lng: -73.846675,
    geocode_quality: "exact"
  },
  {
    id: "4b1d2d93-5013-4833-81fa-ec21b116ab3e",
    bbl: "4098940332",
    borough: "QUEENS",
    zip: "11691",
    house_number_raw: "224",
    house_number_low: 224,
    house_number_high: 224,
    street: "ROCKAWAY BEACH",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "421-G"
    ],
    block: "9894",
    lot: "332",
    lat: 40.596991,
    lng: -73.756236,
    geocode_quality: "exact"
  },
  {
    id: "283d4e14-3681-483f-a4be-54b083cb6be6",
    bbl: "4099100127",
    borough: "QUEENS",
    zip: "11373",
    house_number_raw: "153",
    house_number_low: 153,
    house_number_high: 153,
    street: "37",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51",
      "MULTIPLE DWELLING A"
    ],
    block: "9910",
    lot: "127",
    lat: 40.760317,
    lng: -73.889207,
    geocode_quality: "exact"
  },
  {
    id: "f02e164c-5772-41b2-b212-536d1a93cae0",
    bbl: "4099180252",
    borough: "QUEENS",
    zip: "11692",
    house_number_raw: "74-54",
    house_number_low: null,
    house_number_high: null,
    street: "MOTT",
    street_suffix: "AVENUE",
    secondary_address: "271 BEACH 20 STREET",
    statuses: [
      "421-A (16)"
    ],
    block: "9918",
    lot: "252",
    lat: 40.596987,
    lng: -73.766114,
    geocode_quality: "exact"
  },
  {
    id: "f78375c5-aa2d-4c34-81e0-a8b314a60b23",
    bbl: "5003080233",
    borough: "STATEN ISLAND",
    zip: "10302",
    house_number_raw: "2",
    house_number_low: 2,
    house_number_high: 2,
    street: "PORT RICHMOND",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "J-51"
    ],
    block: "308",
    lot: "233",
    lat: 40.639786,
    lng: -74.135214,
    geocode_quality: "exact"
  },
  {
    id: "1a996b61-eb90-435b-9bdb-065b01befd5e",
    bbl: "5003250314",
    borough: "STATEN ISLAND",
    zip: "10310",
    house_number_raw: "451",
    house_number_low: 451,
    house_number_high: 451,
    street: "JERSEY",
    street_suffix: "STREET",
    secondary_address: "100 FRANKLIN AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "325",
    lot: "314",
    lat: 40.644926,
    lng: -74.087132,
    geocode_quality: "exact"
  },
  {
    id: "8e50a071-68f9-4b62-a9cc-79ffc4c4dd6a",
    bbl: "5008070048",
    borough: "STATEN ISLAND",
    zip: "10310",
    house_number_raw: "529-533",
    house_number_low: 529,
    house_number_high: 533,
    street: "LAFAYETTE",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "421-A (1-15)"
    ],
    block: "807",
    lot: "48",
    lat: 40.636847,
    lng: -74.085409,
    geocode_quality: "exact"
  },
  {
    id: "c4dafa1d-ff82-4130-bde5-98ca1ab679b0",
    bbl: "5011390267",
    borough: "STATEN ISLAND",
    zip: "10306",
    house_number_raw: "499-507",
    house_number_low: 499,
    house_number_high: 507,
    street: "AMBOY",
    street_suffix: "ROAD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING B"
    ],
    block: "1139",
    lot: "267",
    lat: 40.5707,
    lng: -74.119395,
    geocode_quality: "exact"
  },
  {
    id: "93ff7fff-0cea-48e0-94dc-c17df0cf22bd",
    bbl: "5011730066",
    borough: "STATEN ISLAND",
    zip: "10304",
    house_number_raw: "432-434",
    house_number_low: 432,
    house_number_high: 434,
    street: "CANAL",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1173",
    lot: "66",
    lat: 40.629425,
    lng: -74.066457,
    geocode_quality: "approximate"
  },
  {
    id: "1d3b74ed-2f25-489f-b563-34e9e42acdd2",
    bbl: "5016130390",
    borough: "STATEN ISLAND",
    zip: "10305",
    house_number_raw: "628-634",
    house_number_low: 628,
    house_number_high: 634,
    street: "BROAD",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "421-A (1-15)"
    ],
    block: "1613",
    lot: "390",
    lat: 40.626389,
    lng: -74.081346,
    geocode_quality: "exact"
  },
  {
    id: "ccfe1ac9-3e2d-41af-ac51-b953f442b2d4",
    bbl: "5019150231",
    borough: "STATEN ISLAND",
    zip: "10306",
    house_number_raw: "121",
    house_number_low: 121,
    house_number_high: 121,
    street: "HYLAN",
    street_suffix: "BOULEVARD",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "1915",
    lot: "231",
    lat: 40.578894,
    lng: -74.11568,
    geocode_quality: "exact"
  },
  {
    id: "e5efc0e6-172f-4bca-af0c-8ddccc47b982",
    bbl: "5023060011",
    borough: "STATEN ISLAND",
    zip: "10303",
    house_number_raw: "227",
    house_number_low: 227,
    house_number_high: 227,
    street: "RICHMOND",
    street_suffix: "AVENUE",
    secondary_address: "46 CASTLETON AVENUE",
    statuses: [
      "HOTEL"
    ],
    block: "2306",
    lot: "11",
    lat: 40.642641,
    lng: -74.128186,
    geocode_quality: "approximate"
  },
  {
    id: "75679ea3-d3ac-453a-b20c-b294b1d6ea39",
    bbl: "5025280296",
    borough: "STATEN ISLAND",
    zip: "10302",
    house_number_raw: "94",
    house_number_low: 94,
    house_number_high: 94,
    street: "CASTLETON",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "421-A (16)"
    ],
    block: "2528",
    lot: "296",
    lat: 40.639266,
    lng: -74.125356,
    geocode_quality: "exact"
  },
  {
    id: "10830699-734b-4e20-9883-47347aa02db7",
    bbl: "5047020125",
    borough: "STATEN ISLAND",
    zip: "10302",
    house_number_raw: "21",
    house_number_low: 21,
    house_number_high: 21,
    street: "LAFAYETTE",
    street_suffix: "AVENUE",
    secondary_address: "396 FRANKLIN AVENUE",
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "4702",
    lot: "125",
    lat: 40.642708,
    lng: -74.09308,
    geocode_quality: "exact"
  },
  {
    id: "8358b355-0103-4fff-826b-2465291d45d2",
    bbl: "5047970475",
    borough: "STATEN ISLAND",
    zip: "10304",
    house_number_raw: "326",
    house_number_low: 326,
    house_number_high: 326,
    street: "TARGEE",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "4797",
    lot: "475",
    lat: 40.62109,
    lng: -74.080756,
    geocode_quality: "exact"
  },
  {
    id: "98aaa0ca-a0e3-4b7b-ae93-70bc23cabadb",
    bbl: "5056810239",
    borough: "STATEN ISLAND",
    zip: "10306",
    house_number_raw: "320",
    house_number_low: 320,
    house_number_high: 320,
    street: "NEW DORP",
    street_suffix: "LANE",
    secondary_address: "367 HYLAN BOULEVARD",
    statuses: [
      "COOP/CONDO PLAN FILE",
      "MULTIPLE DWELLING A"
    ],
    block: "5681",
    lot: "239",
    lat: 40.568023,
    lng: -74.120814,
    geocode_quality: "exact"
  },
  {
    id: "41e46906-fbe7-4b00-9dc0-471a6945e6ad",
    bbl: "5065290172",
    borough: "STATEN ISLAND",
    zip: "10302",
    house_number_raw: "197",
    house_number_low: 197,
    house_number_high: 197,
    street: "FRANKLIN",
    street_suffix: "AVENUE",
    secondary_address: "39 LAFAYETTE AVENUE",
    statuses: [
      "SEC 608",
      "MULTIPLE DWELLING A"
    ],
    block: "6529",
    lot: "172",
    lat: 40.640222,
    lng: -74.083095,
    geocode_quality: "exact"
  },
  {
    id: "e54162ad-b504-4fc9-aaf9-ac97aeae06be",
    bbl: "5087940004",
    borough: "STATEN ISLAND",
    zip: "10306",
    house_number_raw: "407",
    house_number_low: 407,
    house_number_high: 407,
    street: "NEW DORP",
    street_suffix: "LANE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "8794",
    lot: "4",
    lat: 40.577878,
    lng: -74.119156,
    geocode_quality: "exact"
  },
  {
    id: "4b69e392-2fcf-415c-98fa-eda112d829dc",
    bbl: "5089010477",
    borough: "STATEN ISLAND",
    zip: "10310",
    house_number_raw: "492-500",
    house_number_low: 492,
    house_number_high: 500,
    street: "JERSEY",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "HOTEL"
    ],
    block: "8901",
    lot: "477",
    lat: 40.646871,
    lng: -74.094546,
    geocode_quality: "exact"
  },
  {
    id: "9ae10e73-da57-47a3-b292-64fd18582d3d",
    bbl: "5090080104",
    borough: "STATEN ISLAND",
    zip: "10305",
    house_number_raw: "50",
    house_number_low: 50,
    house_number_high: 50,
    street: "CANAL",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9008",
    lot: "104",
    lat: 40.628097,
    lng: -74.082637,
    geocode_quality: "exact"
  },
  {
    id: "62ccc54f-0f72-41b5-ae4b-9b495a40cef9",
    bbl: "5092130256",
    borough: "STATEN ISLAND",
    zip: "10304",
    house_number_raw: "585",
    house_number_low: 585,
    house_number_high: 585,
    street: "VANDERBILT",
    street_suffix: "AVENUE",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A"
    ],
    block: "9213",
    lot: "256",
    lat: 40.629646,
    lng: -74.082762,
    geocode_quality: "exact"
  },
  {
    id: "c7a6364f-4096-4577-bbac-c33a017e017a",
    bbl: "5094450295",
    borough: "STATEN ISLAND",
    zip: "10304",
    house_number_raw: "459-465",
    house_number_low: 459,
    house_number_high: 465,
    street: "BROAD",
    street_suffix: "STREET",
    secondary_address: null,
    statuses: [
      "MULTIPLE DWELLING A",
      "421-A (1-15)"
    ],
    block: "9445",
    lot: "295",
    lat: 40.621812,
    lng: -74.073417,
    geocode_quality: "exact"
  }
];
