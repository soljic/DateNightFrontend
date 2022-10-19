export function translateCategoryTitle(title) {
  switch (title) {
    case "Biography":
      return "category_biography_title";
    case "Famous":
      return "category_famous_title";
    case "Love":
      return "category_love_title";
    case "Anecdotes":
      return "category_anecdotes_title";
    case "Family":
      return "category_family_title";
    case "Motivational":
      return "category_motivational_title";
    case "Sports":
      return "category_sports_title";
    case "Art":
      return "category_art_title";
    case "War":
      return "category_war_title";
    case "Hobby":
      return "category_hobby_title";
    default:
      return title;
  }
}

export function translateSectionTitle(title) {
  switch (title) {
    case "Discover":
      return "section_discover_title";
    case "Anniversaries":
      return "section_anniversaries_title";
    case "Featured stories":
      return "section_featured_title";
    default:
      return title;
  }
}
