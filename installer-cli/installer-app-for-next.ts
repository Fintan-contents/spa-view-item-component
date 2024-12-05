import { App } from "./App";

const main = async () => {
  try {
    const app = new App();

    console.log("");
    const answers = await app.askQuestions();
    console.log("");
    console.log("########################################");
    console.log("# リソースをコピーします。");
    app.copyResourceDirectory(answers);
    app.replaceTemplate(answers);
    console.log("# リソースをコピーしました。");
    console.log("########################################");
    console.log("");

    console.log("########################################");
    console.log("# パッケージをインストールします。");
    app.installPackages(answers);
    console.log("# パッケージをインストールしました。");
    console.log("########################################");
    console.log("");
    // fileSelectorの待機バグに対応するためのコンソールログ
    console.log("インストールが完了しましたのでEnterキーを押してください。");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};

main();
