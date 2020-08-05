import React, { Fragment } from 'react';
import ReactImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/css/image-gallery.css";
import { AdImage } from './ads/ad-interface';
import { storageUrl } from 'src/core/http';

/**
 * Gallery for ad images.
 */
export function Gallery(props: { items?: AdImage[] }) {
  const images = props.items ?? [];

  if (images.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <img
          style={{ height: 450 }}
          src="https://via.placeholder.com/450?text=Nadji+Auto"
          alt="Placeholder"
        />
      </div>
    );
  }

  const items = images.map((img) => ({
    original: storageUrl + img.md,
    thumbnail: storageUrl + img.xs,
    fullscreen: storageUrl + img.lg,
    originalClass: 'na-ad-gallery-item',
  }));

  return (
    <Fragment>
      <ReactImageGallery
        items={items}
        infinite={false}
        lazyLoad
        showIndex
        slideDuration={250}
        showPlayButton={false}
      />
      {/* Custom styling for gallery. Making gallery more responsive and fixing some quirks */}
      <style jsx global>{`
        /* Gallery positioning */
        .na-ad-gallery-item {
          height: 400px;
        }

        .na-ad-gallery-item > div {
          height: 100%;
          display: flex;
        }

        .na-ad-gallery-item > div > img {
          max-height: 100% !important;
        }

        /* Improve fullscreen for gallery */
        .fullscreen .na-ad-gallery-item {
          height: 80vh;
        }

        .image-gallery-content.fullscreen {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .image-gallery-content.fullscreen > .image-gallery-slide-wrapper.bottom {
          flex-grow: 1;
        }
        /* End fullscreen for gallery */
        /* End gallery positioning */
      `}</style>
    </Fragment>
  );
}
