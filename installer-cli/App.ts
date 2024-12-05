import { select } from "@inquirer/prompts";
import { execSync } from "child_process";
import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import { FileUtil } from "./file-util";
import { PackageInstaller } from "./package-installer";
import packageVersions from "./package-versions/package-versions-1.0.0.json";
import {
  AnswerType,
  ApiGenerationLibraryType,
  PackageManagerType,
  UiComponentType,
  ValidationLibraryType,
} from "./type";

export class App {
  constructor() {}

  getRootPath = (): string => {
    if (process.argv.length < 3) {
      throw new Error(
        "引数に導入したいプロジェクトのルートディレクトリの絶対パスを指定してください。",
      );
    }
    const rootPath = FileUtil.normalizePath(process.argv.slice(2)[0]);
    if (FileUtil.isFileExists(`${rootPath}/package.json`) === false) {
      throw new Error("指定されたディレクトリに package.json が存在しません。");
    }
    return rootPath;
  };

  askQuestions = async (): Promise<AnswerType> => {
    const rootPath = this.getRootPath();
    const packageManager = await this.getPackageManager();
    const uiComponent = await this.getUiComponent();
    const validationLibrary = await this.getValidationLibrary();
    const apiGenerationLibrary = await this.getApiGenerationLibrary();
    const isDemoScreenIncluded = await this.getIsDemoScreenIncluded();
    const isStorybookIncluded = await this.getIsStorybookIncluded();
    const destPath = await this.getDestPath(this.getRootPath());

    const answers: AnswerType = {
      rootPath: rootPath,
      packageManager: packageManager,
      uiComponent: uiComponent,
      validationLibrary: validationLibrary,
      apiGenerationLibrary: apiGenerationLibrary,
      isDemoScreenIncluded: isDemoScreenIncluded,
      isStorybookIncluded: isStorybookIncluded,
      destPath: destPath,
    };
    return answers;
  };

  // コピー先ディレクトリのパスを取得する関数
  private getDestPath = async (rootPath: string): Promise<string> => {
    inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

    // WARNING: オプションの選択後に待機が発生するバグあり
    // → 現在は「Enterを押してください」と表示することで対処
    const destPath = await inquirer.prompt([
      {
        type: "file-tree-selection",
        message:
          "frameworkフォルダをコピーするディレクトリを選択してください。",
        onlyShowDir: true,
        root: rootPath,
        name: "path",
        enableGoUpperDirectory: false,
        onlyShowValid: true,
        validate: (path: string) => {
          const pathSegments = FileUtil.normalizePath(path).split("/");
          const lastSegment = pathSegments[pathSegments.length - 1];
          // node_modulesおよび、.から始まるディレクトリは選択不可とする
          if (
            lastSegment.toLowerCase() === "node_modules" ||
            lastSegment.startsWith(".")
          ) {
            return false;
          }
          return true;
        },
      },
    ]);

    return FileUtil.normalizePath(destPath.path);
  };

  private getPackageManager = async (): Promise<PackageManagerType> => {
    return await select({
      message: "パッケージマネージャを選択してください。",
      choices: ["npm", "yarn"],
    });
  };

  // UIコンポーネントライブラリを取得する関数
  private getUiComponent = async (): Promise<UiComponentType> => {
    return await this.askSelect<UiComponentType>(
      "UIコンポーネントライブラリを選択してください。",
      [
        { name: "Ant Design", value: "antd" },
        { name: "Material UI", value: "mui" },
        { name: "React Bootstrap", value: "bootstrap" },
      ],
    );
  };

  private getValidationLibrary = async (): Promise<ValidationLibraryType> => {
    return await this.askSelect<ValidationLibraryType>(
      "バリデーションライブラリを選択してください。",
      [
        { name: "Yup", value: "yup" },
        { name: "Zod", value: "zod" },
      ],
    );
  };

  private getApiGenerationLibrary =
    async (): Promise<ApiGenerationLibraryType> => {
      return await this.askSelect<ApiGenerationLibraryType>(
        "API呼び出し方式を選択してください。",
        [
          { name: "Orval（シンプル版）", value: "orval-simple" },
          { name: "Orval（拡張版）", value: "orval-advanced" },
          { name: "TanStack Query", value: "react-query" },
        ],
      );
    };

  private getIsDemoScreenIncluded = async (): Promise<boolean> => {
    return await this.askSelect<boolean>("デモ画面をインストールしますか？", [
      { name: "はい", value: true },
      { name: "いいえ", value: false },
    ]);
  };

  private getIsStorybookIncluded = async (): Promise<boolean> => {
    return await this.askSelect<boolean>("Storybookをインストールしますか？", [
      { name: "はい", value: true },
      { name: "いいえ", value: false },
    ]);
  };

  private askSelect = async <T>(
    message: string,
    options: { name: string; value: T }[],
  ): Promise<T> => {
    return await select({
      message: message,
      choices: options,
    });
  };

  // リソースディレクトリをコピーする関数
  copyResourceDirectory = (answers: AnswerType): void => {
    const frameworkPath = answers.destPath;
    // commonディレクトリをコピーする
    console.log("...");
    console.log(`... resource/commonをインストールします。`);
    console.log("...");
    FileUtil.copyDirectoryRecursive("resource/common", frameworkPath);

    // UIコンポーネントライブラリのディレクトリをコピーする
    console.log("...");
    console.log(`... resource/${answers.uiComponent}をインストールします。`);
    console.log("...");
    FileUtil.copyDirectoryRecursive(
      `resource/${answers.uiComponent}`,
      frameworkPath,
    );

    // バリデーションライブラリのディレクトリをコピーする
    console.log("...");
    console.log(
      `... resource/${answers.validationLibrary}をインストールします。`,
    );
    console.log("...");
    FileUtil.copyDirectoryRecursive(
      `resource/${answers.validationLibrary}`,
      frameworkPath,
    );

    // API生成ライブラリのディレクトリをコピーする
    const apiDirectoryName =
      answers.apiGenerationLibrary === "orval-advanced"
        ? "react-query-advanced"
        : "react-query";
    console.log("...");
    console.log(`... resource/${apiDirectoryName}をインストールします。`);
    console.log("...");
    FileUtil.copyDirectoryRecursive(
      `resource/${apiDirectoryName}`,
      frameworkPath,
    );
    // Orval（拡張版）の場合は、react-queryのディレクトリもコピーする
    if (apiDirectoryName === "react-query-advanced") {
      FileUtil.copyDirectoryRecursive(`resource/react-query`, frameworkPath);
    }

    // Storybookディレクトリをコピーする
    if (answers.isStorybookIncluded) {
      console.log("...");
      console.log(
        `... resource/stories-${answers.uiComponent}をインストールします。`,
      );
      console.log("...");
      FileUtil.copyDirectoryRecursive(
        `resource/stories-${answers.uiComponent}`,
        frameworkPath,
      );
    }
  };

  // デモファイルの置換＆コピーを行う関数
  replaceTemplate = (answers: AnswerType): void => {
    if (!answers.isDemoScreenIncluded) {
      return;
    }
    const templatePath = `template/demo-${answers.uiComponent}`;

    // (1) デモファイルのコピー元ファイルを一覧で取得する
    const demoFilePaths = FileUtil.getFileList(templatePath);

    // {{COPY_ROOT_PATH}}の置換パスを作成する
    const nonSrcRelatedPath = FileUtil.convertToRelativePath(
      answers.rootPath,
      answers.destPath,
    ).replace(/^src/, "");

    // デモ資材の配置先を決定(AppRouterを想定し、appディレクトリの下にdemoを作成する)
    let appPath = answers.rootPath;
    if (FileUtil.existDirectory(answers.rootPath, "app")) {
      appPath = answers.rootPath + "/app";
    } else if (
      FileUtil.existDirectory(answers.rootPath, "src") &&
      FileUtil.existDirectory(answers.rootPath + "/src", "app")
    ) {
      appPath = answers.rootPath + "/src/app";
    }

    // (2) 一覧のファイル一つ一つに対して
    demoFilePaths.forEach((demoFilePath) => {
      // ファイル名を正規化する
      const normalizedDemoFilePath = FileUtil.normalizePath(demoFilePath);
      const destPath = `${appPath}/${normalizedDemoFilePath.replace(
        templatePath,
        "demo",
      )}`;
      // (3) 置換＆コピーを実施する
      FileUtil.replaceTemplateString(normalizedDemoFilePath, destPath, [
        {
          name: "{{COPY_ROOT_PATH}}",
          value: `${nonSrcRelatedPath}`,
        },
      ]);
    });
  };

  installPackages = (answers: AnswerType): void => {
    const packageInstaller = new PackageInstaller(answers.packageManager);
    const installedPackages = this.getInstalledPackages(answers);

    try {
      installedPackages.forEach((target) => {
        console.log("...");
        console.log(
          `... パッケージ ${target.packageName} をインストールします。`,
        );
        console.log("...");
        packageInstaller.install(
          this.getRootPath(),
          target.packageName,
          target.isDev,
        );
      });

      if (answers.isStorybookIncluded) {
        console.log("Storybook をインストールします。");
        FileUtil.renameStorybookDirectory(answers.rootPath);
        const command = `npx storybook@${packageVersions["storybook"]} init --no-dev --yes `;
        execSync(command, {
          cwd: this.getRootPath(),
          encoding: "utf8",
          stdio: "inherit",
        });
        FileUtil.removeDirectoryRecursive(`${answers.rootPath}/.storybook`);
        FileUtil.copyDirectoryRecursive(
          `resource/.storybook/${answers.uiComponent}/.storybook`,
          `${answers.rootPath}/.storybook`,
        );
        // srcディレクトリが存在しない場合は.storybook/main.tsファイルを書き換える
        if (!FileUtil.existDirectory(answers.rootPath, "src")) {
          FileUtil.rewriteMainTsIfSrcNotExists(answers.rootPath);
        }
      }
    } catch (error) {
      console.error(
        "パッケージのインストール中にエラーが発生しました：\n\n",
        error,
      );
      throw error;
    }
  };

  private getInstalledPackages = (
    answers: AnswerType,
  ): { packageName: string; isDev: boolean }[] => {
    const packages: { packageName: string; isDev: boolean }[] = [];

    if (answers.uiComponent === "antd") {
      packages.push({
        packageName: `antd@${packageVersions["antd"]}`,
        isDev: false,
      });
    } else if (answers.uiComponent === "mui") {
      packages.push({
        packageName: `@mui/material@${packageVersions["@mui/material"]}`,
        isDev: false,
      });
      packages.push({
        packageName: `@mui/icons-material@${packageVersions["@mui/icons-material"]}`,
        isDev: false,
      });
      packages.push({
        packageName: `@emotion/react@${packageVersions["@emotion/react"]}`,
        isDev: false,
      });
      packages.push({
        packageName: `@emotion/styled@${packageVersions["@emotion/styled"]}`,
        isDev: false,
      });
      packages.push({
        packageName: `@mui/x-date-pickers@${packageVersions["@mui/x-date-pickers"]}`,
        isDev: false,
      });
    } else if (answers.uiComponent === "bootstrap") {
      packages.push({
        packageName: `react-bootstrap@${packageVersions["react-bootstrap"]}`,
        isDev: false,
      });
      packages.push({
        packageName: `bootstrap@${packageVersions["bootstrap"]}`,
        isDev: false,
      });
      packages.push({
        packageName: `@types/react-bootstrap@${packageVersions["@types/react-bootstrap"]}`,
        isDev: true,
      });
    }

    if (answers.validationLibrary === "yup") {
      packages.push({
        packageName: `yup@${packageVersions["yup"]}`,
        isDev: false,
      });
    } else if (answers.validationLibrary === "zod") {
      packages.push({
        packageName: `zod@${packageVersions["zod"]}`,
        isDev: false,
      });
    }

    if (
      answers.apiGenerationLibrary === "orval-simple" ||
      answers.apiGenerationLibrary === "orval-advanced"
    ) {
      packages.push({
        packageName: `axios@${packageVersions["axios"]}`,
        isDev: false,
      });
      packages.push({
        packageName: `@tanstack/react-query@${packageVersions["@tanstack/react-query"]}`,
        isDev: false,
      });
      packages.push({
        packageName: `orval@${packageVersions["orval"]}`,
        isDev: true,
      });
    } else if (answers.apiGenerationLibrary === "react-query") {
      packages.push({
        packageName: `@tanstack/react-query@${packageVersions["@tanstack/react-query"]}`,
        isDev: false,
      });
    }

    packages.push({
      packageName: `dayjs@${packageVersions["dayjs"]}`,
      isDev: false,
    });

    packages.push({
      packageName: `@mockoon/cli@${packageVersions["@mockoon/cli"]}`,
      isDev: true,
    });

    return packages;
  };
}
