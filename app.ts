window.onload = () => {
  const pageHeight = window.innerHeight;

  const mainPage = document.querySelector(".main-page");
  const mainCover = document.querySelector(
    ".main-page .cover"
  ) as HTMLDivElement;
  const imagesPage = document.querySelector(".images") as HTMLDivElement;
  const col2 = document.querySelector(".images-content .col-2") as HTMLDivElement;

  const col2Height = Array.from(col2.children).reduce((pre, item) => {
    return pre + (item as HTMLDivElement).offsetHeight;
  }, 0);
  const col2TotalTransform = col2Height - imagesPage.offsetHeight;

  const point = 0.5; /* for main page */
  const endPoint = 0.9; /* for main page */
  const imagesPoint = 0.4;
  const imagesStartPoint = imagesPage.offsetHeight * imagesPoint;
  const windowOffsetWhenImagesLeave =
    imagesPage.offsetTop + imagesPage.offsetHeight - window.innerHeight;

  window.addEventListener("scroll", (e) => {
    const offset = window.pageYOffset;
    const imagesPageToTop = imagesPage.offsetTop - offset;

    if (offset / pageHeight >= point) {
      const opacity = (offset / pageHeight - point) / (endPoint - point);
      mainCover.style.opacity = `${opacity}`;
    } else {
      mainCover.style.opacity = "0";
    }

    if (
      imagesPageToTop <= imagesStartPoint &&
      offset <= windowOffsetWhenImagesLeave
    ) {
      const percent =
        (offset - (imagesPage.offsetTop - imagesStartPoint)) /
        (windowOffsetWhenImagesLeave - (imagesPage.offsetTop - imagesStartPoint));
      const transform = col2TotalTransform * -percent;
      col2.style.top = `${transform}px`
    } else if (offset > windowOffsetWhenImagesLeave) {
      col2.style.top = `${-col2TotalTransform}px`
    } else {
      col2.style.top = `0px`
    }
  });
};
