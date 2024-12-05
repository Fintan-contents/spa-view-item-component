import { execSync } from "child_process";
import { PackageManagerType } from "./type";

export class PackageInstaller {
  packageManagerType: PackageManagerType;

  constructor(packageManagerType: PackageManagerType) {
    // コンストラクタ
    this.packageManagerType = packageManagerType;
  }

  install(
    workDir: string,
    target: string,
    isDevDependency: boolean = false,
  ): void {
    let packageInstallCommand =
      this.packageManagerType === "yarn" ? "yarn add" : "npm i";
    if (isDevDependency === true) {
      packageInstallCommand += " -D";
    }

    const command = packageInstallCommand + " " + target;

    try {
      execSync(command, { cwd: workDir, encoding: "utf8", stdio: "inherit" });
    } catch (error) {
      console.error("パッケージのインストール中にエラーが発生しました：");
      console.error(error);
      console.error("\n\n");
      throw new Error(`パッケージの${target}のインストールに失敗しました`);
    }
  }
}
