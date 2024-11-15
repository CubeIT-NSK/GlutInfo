import React from "react";
import styles from "./index.module.css";
import PhotoGallerySlider from "../../../shared/components/Sliders/PhotoGallerySlider";
import images from "../../../shared/resources/images";
import SideLink from "../../../shared/components/SideLink";

export default function PhotoGallery() {

    const sliderData = {
        PhotoGalleryData: [
            {
                bgImage: images.newsNPKImage,
                alt: 'newsNPKImage'
            },
            {
                bgImage: images.newsNPKImage,
                alt: 'newsNPKImage'
            },
            {
                bgImage: images.newsNPKImage,
                alt: 'newsNPKImage'
            },
            {
                bgImage: images.newsNPKImage,
                alt: 'newsNPKImage'
            },
            {
                bgImage: images.newsNPKImage,
                alt: 'newsNPKImage'
            },
        ],
    };


    return (
            <>
                <SideLink />
                <section className={styles.photoGallerySection}>
                    <div className="container">
						<PhotoGallerySlider slides={sliderData.PhotoGalleryData} />
                    </div>
                </section>
            </>
    );
}
