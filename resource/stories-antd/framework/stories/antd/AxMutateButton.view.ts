import {
  CsView,
  CsInputTextItem,
  CsTextAreaItem,
  useCsView,
  useCsInputTextItem,
  useInit,
  stringRule,
  RW,
  useCsTextAreaItem,
  CsMutateButtonClickEvent,
} from "../../logics";
import { useCsRqMutateButtonClickEvent } from "../../logics/react-query/CsRQEvent";
import { Todo, TodoRegistration } from "../libs/generated/model";
import { useMutation } from "@tanstack/react-query";

const postTodo = (isSuccess: boolean) => {
  return new Promise<Todo[]>((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve([{ id: 1, title: "title1", description: "description1" }]);
      } else {
        reject("error");
      }
    }, 500);
  });
};

/**
 * 登録用のView
 */
export type TodoPostView = CsView & {
  mode: "success" | "fail" | "validate";
  title: CsInputTextItem;
  description: CsTextAreaItem;
  createButton: CsMutateButtonClickEvent<
    {
      data: TodoRegistration;
    },
    Todo[]
  >;
};

/**
 * 登録用のViewの初期化
 *
 * @returns TodoPostView　登録用のView
 */
export const useTodoPostView = (
  mode: "success" | "fail" | "validate",
): TodoPostView => {
  return useCsView(
    {
      mode: mode,
      title: useCsInputTextItem(
        "タイトル",
        useInit(""),
        stringRule(false, 1, 10),
        RW.Editable,
      ),
      description: useCsTextAreaItem(
        "説明",
        useInit(""),
        stringRule(false),
        RW.Editable,
      ),
      createButton: useCsRqMutateButtonClickEvent(
        useMutation({
          mutationFn: () => postTodo(mode === "success" ? true : false),
        }),
      ),
    },
    {
      validationTrigger: "onSubmit",
    },
  );
};
