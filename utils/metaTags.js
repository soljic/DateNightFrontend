export function SetStoryOG(spiritus, story) {
  let tags = [
    <meta property="og:type" content="website" key={`story-${story.id}-ws`} />,
    <meta
      property="og:site_name"
      content="Spiritus"
      key={`story-${story.id}-site-name`}
    />,
    <meta
      property="og:title"
      content={
        `${spiritus.name} ${spiritus.surname} — ${story.title}` ||
        "Spiritus Stories"
      }
      key={`story-${story.id}-title`}
    />,
    <meta
      property="og:url"
      content={encodeURI(
        `https://spiritus.app/en/spiritus/${spiritus.slug}/story/${story.slug}`
      )}
      key={`story-${story.id}-url`}
    />,
    <meta
      property="og:description"
      content={
        story.description && story.description.length
          ? story.description
          : "Spiritus is the first digital assets platform that keeps your memories - forever! Read the latest beautiful stories, memorials and anniversaries."
      }
      key={`story-${story.id}-desc`}
    />,
  ];
  if (story.images.length) {
    const useImage = story.images[0];
    tags = tags.concat([
      <meta
        property="og:image"
        itemProp="image"
        content={useImage.url}
        key={`story-${story.id}-image`}
      />,
      <meta
        property="og:image:url"
        itemProp="image"
        content={useImage.url}
        key={`story-${story.id}-image-url`}
      />,
      // <meta
      //   property="og:image:secure_url"
      //   itemProp="image"
      //   content={useImage.url}
      //   key="image"
      // />,
      <meta property="og:image:width" content={useImage.width} key="image-w" />,
      <meta
        property="og:image:height"
        content={useImage.height}
        key={`story-${story.id}-image-h`}
      />,
    ]);
  } else {
    tags = tags.concat([
      <meta
        property="og:image"
        itemProp="image"
        content="https://spiritus.app/images/share/banner.jpg"
        key={`story-${story.id}-image`}
      />,
      <meta
        property="og:image:url"
        itemProp="image"
        content="https://spiritus.app/images/share/banner.jpg"
        key={`story-${story.id}-image-url`}
      />,
      // <meta
      //   property="og:image:secure_url"
      //   itemProp="image"
      //   content="https://spiritus.app/images/share/banner.jpg"
      //   key="image"
      // />,
      <meta
        property="og:image:width"
        content="1200"
        key={`story-${story.id}-image-w`}
      />,
      <meta
        property="og:image:height"
        content="630"
        key={`story-${story.id}-image-h`}
      />,
    ]);
  }
  return tags;
}

export function SetSpiritusOG(spiritus) {
  let tags = [
    <meta
      property="og:type"
      content="website"
      key={`spiritus-${spiritus.id}-ws`}
    />,
    <meta
      property="og:site_name"
      content="Spiritus"
      key={`spiritus-${spiritus.id}-site-name`}
    />,
    <meta
      property="og:title"
      content={
        spiritus
          ? `Spiritus | ${spiritus.name} ${spiritus.surname}`
          : "Spiritus"
      }
      key={`spiritus-${spiritus.id}-title`}
    />,
    <meta
      property="og:url"
      content={encodeURI(`https://spiritus.app/en/spiritus/${spiritus.slug}`)}
      key={`spiritus-${spiritus.id}-url`}
    />,
    <meta
      property="og:description"
      content={
        spiritus.description && spiritus.description.length
          ? spiritus.description
          : "Spiritus is the first digital assets platform that keeps your memories - forever! Read the latest beautiful stories, memorials and anniversaries."
      }
      key={`spiritus-${spiritus.id}-desc`}
    />,
  ];
  if (spiritus.profileImage) {
    const useImage = spiritus.profileImage;
    tags = tags.concat([
      <meta
        property="og:image"
        itemProp="image"
        content={spiritus.profileImage}
        key={`spiritus-${spiritus.id}-image`}
      />,
      <meta
        property="og:image:url"
        itemProp="image"
        content={useImage.url}
        key={`spiritus-${spiritus.id}-image-url`}
      />,
      // <meta
      //   property="og:image:secure_url"
      //   itemProp="image"
      //   content={useImage.url}
      //   key={`spiritus-${spiritus.id}-image-secure`}
      // />,
      <meta
        property="og:image:width"
        content={useImage.width}
        key={`spiritus-${spiritus.id}-image-w`}
      />,
      <meta
        property="og:image:height"
        content={useImage.height}
        key={`spiritus-${spiritus.id}-image-h`}
      />,
    ]);
  } else {
    tags = tags.concat([
      <meta
        property="og:image"
        itemProp="image"
        content="https://spiritus.app/images/share/banner.jpg"
        key="image"
      />,
      <meta
        property="og:image:url"
        itemProp="image"
        content="https://spiritus.app/images/share/banner.jpg"
        key="image"
      />,
      // <meta
      //   property="og:image:secure_url"
      //   itemProp="image"
      //   content="https://spiritus.app/images/share/banner.jpg"
      //   key="image"
      // />,
      <meta property="og:image:width" content="1200" key="image-w" />,
      <meta property="og:image:height" content="630" key="image-h" />,
    ]);
  }
  return tags;
}
