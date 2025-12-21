---
slug: /
sidebar_position: 1
---
import FullscreenZoomSvg from '@site/src/components/FullscreenZoomSvg.js';
import MySvgImage from '@site/projects/bharatos/_assets/image.svg';

# intro

this is the intro of bharatos

## NOT clickable image links
![MySvgImage](@site/projects/bharatos/_assets/image.svg)

## CLICKABLE image links
<MySvgImage style={{ maxWidth: "100%", height: "auto" }} />
<!-- style tag gives same size to the this svg image as above markdown embeded image -->
<!-- without using style tag image showing different side on desktop and different on phone -->


## ZOOMABLE svg
<FullscreenZoomSvg SvgComponent={MySvgImage} />

