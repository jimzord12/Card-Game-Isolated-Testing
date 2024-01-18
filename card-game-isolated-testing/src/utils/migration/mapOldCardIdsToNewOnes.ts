export const mapOldCardIdsToNewOnes = (templateId: number) => {
  if ([1, 7, 13].includes(templateId)) {
    switch (templateId) {
      case 1:
        return 201;
      case 7:
        return 301;
      case 13:
        return 101;
    }
  } else {
    return templateId;
  }
};
