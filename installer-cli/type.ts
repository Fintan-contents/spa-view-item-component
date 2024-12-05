export type AnswerType = {
  rootPath: string;
  packageManager: PackageManagerType;
  destPath: string;
  uiComponent: UiComponentType;
  validationLibrary: ValidationLibraryType;
  apiGenerationLibrary: ApiGenerationLibraryType;
  isDemoScreenIncluded: boolean;
  isStorybookIncluded: boolean;
};

export type PackageManagerType = "npm" | "yarn";

export type UiComponentType = "antd" | "mui" | "bootstrap";

export type ValidationLibraryType = "yup" | "zod";

export type ApiGenerationLibraryType =
  | "orval-simple"
  | "orval-advanced"
  | "react-query";
