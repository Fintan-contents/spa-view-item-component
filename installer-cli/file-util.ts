import fs from "fs";
import path from "path";

export class FileUtil {
  /**
   * 指定されたディレクトリ直下で、特定の名前のディレクトリを検索する。
   *
   * @param baseDir - 検索を開始するディレクトリのパス
   * @param targetName - 検索対象のディレクトリ名
   * @returns 見つかったら{true}、見つからなかったら{false}を返す。
   */
  static existDirectory(baseDir: string, targetName: string): boolean {
    const items = fs.readdirSync(baseDir, { withFileTypes: true });

    for (const item of items) {
      if (
        item.isDirectory() &&
        item.name.toLowerCase() === targetName.toLowerCase()
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * 指定されたディレクトリを再帰的にコピーする。
   *
   * @param src - コピー元のディレクトリのパス
   * @param dest - コピー先のディレクトリのパス
   */
  static copyDirectoryRecursive(src: string, dest: string): void {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    fs.mkdirSync(dest, { recursive: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        FileUtil.copyDirectoryRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  /**
   * 指定されたディレクトリ内のすべてのファイルのパスを再帰的に取得する。
   *
   * @param {string} dirPath - ファイルリストを取得するディレクトリのパス。
   * @returns {string[]} ディレクトリ内のすべてのファイルのパスを含む配列。
   */
  static getFileList(dirPath: string) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const result = [];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        result.concat(FileUtil.getFileList(path.join(dirPath, entry.name)));
      }
      if (entry.isFile()) {
        result.push(path.join(dirPath, entry.name));
      }
    }
    return result;
  }

  /**
   * 指定されたテンプレート文字列を置換し、結果を新しいファイルに書き込む。
   *
   * @param {string} srcPath - 置換対象のテンプレートファイルのパス。
   * @param {string} destPath - 置換後の内容を書き込むファイルのパス。
   * @param {{ name: string; value: string }[]} templates - 置換するテンプレート文字列とその値の配列。
   */
  static replaceTemplateString(
    srcPath: string,
    destPath: string,
    templates: { name: string; value: string }[],
  ) {
    /**
     * 指定されたファイルパスのディレクトリが存在するか確認し、存在しない場合は再帰的にディレクトリを作成する。
     *
     * @param {string} filePath - 確認および作成するディレクトリを含むファイルパス。
     * @returns {boolean} ディレクトリが既に存在する場合はtrue、作成された場合はfalse。
     */
    function ensureDirectoryExistence(filePath: string) {
      const dirname = path.dirname(filePath);
      if (fs.existsSync(dirname)) {
        return true;
      }
      fs.mkdirSync(dirname, { recursive: true });
    }

    const contents = fs.readFileSync(srcPath, "utf-8");

    let newContents: string = "";
    templates.forEach((template) => {
      const regex = new RegExp(template.name, "g");
      newContents = contents.replace(regex, template.value);
    });

    ensureDirectoryExistence(destPath);
    fs.writeFileSync(destPath, newContents);
  }

  /**
   * 指定されたファイルパスを正規化する。
   *
   * @param {string} destPath - 正規化するファイルパス。
   * @returns {string} スラッシュで正規化されたファイルパス。
   */
  static normalizePath = (destPath: string) => {
    // バックスラッシュをスラッシュに置換する
    return path.normalize(destPath).replace(/\\/g, "/");
  };

  /**
   * ルートパスから目的パスへの相対パスを計算し、バックスラッシュをスラッシュに置換します。
   *
   * @param {string} rootPath - 基準となるルートパス。
   * @param {string} destPath - 相対パスを計算する目的パス。
   * @returns {string} ルートパスから目的パスへの相対パス（スラッシュで区切られた形式）。
   */
  static convertToRelativePath = (rootPath: string, destPath: string) => {
    return path.relative(rootPath, destPath).replace(/\\/g, "/");
  };

  /**
   * 指定されたパスにファイルが存在するかどうかをチェックします。
   *
   * @param {string} filePath - 存在を確認するファイルのパス。
   * @returns {boolean} ファイルが存在する場合は true、それ以外の場合は false。
   */
  static isFileExists = (filePath: string): boolean => {
    return fs.existsSync(filePath);
  };

  /**
   * 指定されたディレクトリを再帰的に削除する。
   *
   * @param {string} dirPath - 削除するディレクトリのパス。
   */
  static removeDirectoryRecursive(dirPath: string): void {
    if (fs.existsSync(dirPath)) {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
          FileUtil.removeDirectoryRecursive(fullPath);
        } else {
          fs.unlinkSync(fullPath);
        }
      }
      fs.rmdirSync(dirPath);
    }
  }

  /**
   * 指定されたディレクトリの名前をリネームする。
   *
   * @param {string} baseDir - リネームするディレクトリの親ディレクトリのパス。
   */
  static renameStorybookDirectory(baseDir: string): void {
    const items = fs.readdirSync(baseDir, { withFileTypes: true });
    const storybookDirs = items
      .filter(
        (item) => item.isDirectory() && item.name.startsWith(".storybook"),
      )
      .map((item) => item.name);

    let maxIndex = 0;
    const regex = /\.storybook_backup_(\d+)$/;

    storybookDirs.forEach((dir) => {
      const match = dir.match(regex);
      if (match) {
        const index = parseInt(match[1], 10);
        if (index > maxIndex) {
          maxIndex = index;
        }
      }
    });

    const newIndex = maxIndex + 1;
    if (newIndex > 99) {
      throw new Error(
        ".storybook_backupファイルが99個を超えたためインストールに失敗しました。古いバックアップファイルを削除してください。",
      );
    }
    const newDirName = `.storybook_backup_${String(newIndex).padStart(2, "0")}`;
    const oldDirPath = path.join(baseDir, ".storybook");
    const newDirPath = path.join(baseDir, newDirName);

    if (fs.existsSync(oldDirPath)) {
      fs.renameSync(oldDirPath, newDirPath);
    }
  }

  /**
   * ディレクトリにsrcが存在しない場合、.storybookのmain.tsを書き換える
   *
   * @param {string} rootPath - 基準となるルートパス
   */
  static rewriteMainTsIfSrcNotExists(rootPath: string): void {
    const mainTsFilePath = path.join(
      "resource",
      ".storybook",
      "nonsrc",
      ".storybook",
      "main.ts",
    );
    const mainTsFileContent = fs.readFileSync(mainTsFilePath, "utf8");

    fs.writeFileSync(
      path.join(rootPath, ".storybook/main.ts"),
      mainTsFileContent,
      "utf8",
    );
  }
}
