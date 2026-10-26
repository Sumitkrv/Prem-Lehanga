# Prem Lehanga Studio — asset and identity research

Internal preview record. This file is not linked from the website.

## Supplied source

- Instagram profile: <https://www.instagram.com/premlehangastudio/?hl=en>
- Handle supplied in the brief: `@premlehangastudio`
- Brand name supplied in the brief: `PREM LEHANGA STUDIO`

## Access result

The Instagram profile could not be fetched by the available public web reader, so its biography, highlights, post URLs, captions and stories could not be independently reviewed. No Instagram CDN images were downloaded.

The user supplied one JPG and five MP4 clips in the workspace, plus a compact logo image in chat. The photo and videos are included locally because the user asked to use them. Their connection to the official account has not been independently verified. The supplied logo reference is rendered as a scalable local SVG for the site header, footer, and favicon. A Prem Lehanga Studio sign is visible behind a model in one video frame, but the figure obscures it; it is not used as a logo.

Public search surfaced a [third-party directory listing](https://magicpin.in/New-Delhi/Omaxe-Chowk-Mall/Fashion/Prem-Lehanga-Studio-%28Couture-By-Kunal%29/store/1a01669) for a similarly named Prem Lehanga Studio in Chandni Chowk, Delhi. The brief expressly warns that the listing may not correspond to this Instagram profile, so its address and phone number are not used in this website.

## Identity decisions

- The site uses the supplied brand name and handle only.
- The header and footer combine the supplied logo reference with a readable PREM LEHANGA STUDIO wordmark.
- Royal burgundy, antique gold, ivory, and plum are provisional design tokens from the brief; they are not represented as verified Instagram brand colors.
- Collection names and garment descriptions are illustrative groupings and display copy only.
- Supplied video clips and one supplied campaign-style photo are used locally in the hero, collection gallery, product preview, and video journal. Poster stills were extracted from those clips for fast previews.
- Remaining abstract visual panels are original, textile-inspired SVG artwork. They are labeled as placeholders and are not represented as garments or official Instagram posts.
- Instagram is the only configured contact destination. No address, phone number, WhatsApp number, hours, or appointment service has been verified.

## Original asset manifest

| Source / original filename | Local filename | Section usage | Status |
| --- | --- | --- | --- |
| User-supplied logo image in chat | `public/assets/brand/prem-logo.svg` | Header, footer, loading screen, favicon | Local SVG rendering of the supplied logo reference |
| User-supplied file `SaveClip.App_842328704_18132855304780688_1626671439501115721_n.jpg` | `public/assets/hero/prem-studio-pair.jpg` | Homepage hero | User-supplied; official account provenance not independently verified |
| User-supplied file `SaveClip.App_AQN3jpco-Og26unOJgtkHvMYiTZrpperPrj0oCCZk5BBhcaKYtYVE-bdhP6j5Y8iUnI49bQVyPVPww_Cm2LpwUJtCJbJmnTCAzr4DsI.mp4` | `public/assets/video/prem-reel-01.mp4`, `prem-reel-01-poster.jpg` | Homepage video preview, lookbook, red look | User-supplied clip; poster extracted locally |
| User-supplied file `SaveClip.App_AQN7gUJgsD-G-uz2hIby3Kx2YoZ_VhldCn-j4Akjawa8RLi3R9OXWLGHoA88nMlJZteCPUqCjmKYALLwycbVTScq87DXoDseVQEPhoM.mp4` | `public/assets/video/prem-reel-02.mp4`, `prem-reel-02-poster.jpg` | Lookbook, black look | User-supplied clip; poster extracted locally |
| User-supplied file `SaveClip.App_AQNZt4x58o68-o6jPoAz8LWr_Yqucia2TGzsSeZDVTc_zEH4HOJKMshc04J2tWfVSdIwo64L7FpNu8hnny7wfqMO-bJ9-RaFNl6LfTo.mp4` | `public/assets/video/prem-reel-03.mp4`, `prem-reel-03-poster.jpg` | Lookbook, ivory detail | User-supplied clip; poster extracted locally |
| User-supplied file `SaveClip.App_AQOtxEl4scyhKzlBmAyqVpXUjth_U70rwjSOWY8MAo56JC5inj19ALUJkcaNX2aL8HMGsMYDiFPfYdNb84-Uv9gITNxXIyKcs6QvC8E.mp4` | `public/assets/video/prem-reel-04.mp4`, `prem-reel-04-poster.jpg` | Homepage video preview, lookbook, bridal feature | User-supplied clip; poster extracted locally |
| User-supplied file `SaveClip.App_AQPmAzeZDJPixvkHThDdobkqumW8YPE-TtjpnInR-gu8x1r1DQM8QDliBaGROX91T7vv_v44wF6pPmw91QwhtzsjNGzAU9Bu926EJMo.mp4` | `public/assets/video/prem-reel-05.mp4`, `prem-reel-05-poster.jpg` | Homepage video preview, lookbook, blush look | User-supplied clip; poster extracted locally |

## Suggested assets to request from the studio

- An approved transparent or vector logo, if one exists.
- One landscape or portrait campaign image for the homepage hero.
- Distinct original photographs for each confirmed collection and product detail.
- Close-up garment or fabric details for the editorial story.
- Approved lookbook images and matching Instagram post URLs.
- Confirmed studio location, phone/WhatsApp contact, visiting hours, and appointment process if these should appear publicly.

Suggested drop locations are under `public/assets/brand/`, `public/assets/hero/`, `public/assets/collections/`, `public/assets/products/`, and `public/assets/lookbook/`. Update the centralized files in `src/data/` and replace the `ImageCanvas` placeholder where the approved originals are ready.
