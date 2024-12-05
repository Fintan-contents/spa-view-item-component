import {
  CsView,
  CsInputNumberItem,
  useCsInputNumberItem,
  useInit,
  numberRule,
  RW,
  useCsView,
  CsQueryButtonClickEvent,
} from "../../logics";
import { useCsRqQueryButtonClickEvent } from "../../logics/react-query/CsRQEvent";
import { Todo } from "../libs/generated/model";
import { useQuery } from "@tanstack/react-query";

const fetchListTodo = (isSuccess: boolean) => {
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
 * 一覧取得用のView
 */
export type TodosGetView = CsView & {
  mode: "success" | "fail" | "validate";
  page: CsInputNumberItem;
  searchButton: CsQueryButtonClickEvent<Todo[]>;
};

/**
 * 一覧取得用のViewの初期化
 *
 * @returns TodosGetView 一覧取得用のView
 */
export const useTodoGetView = (
  mode: "success" | "fail" | "validate",
): TodosGetView => {
  const page = useCsInputNumberItem(
    "page",
    useInit(1),
    numberRule(false, 1, 10),
    RW.Editable,
  );
  const view = useCsView(
    {
      mode: mode,
      page: page,
      searchButton: useCsRqQueryButtonClickEvent(
        useQuery({
          queryKey: ["todos"],
          queryFn: () => {
            return fetchListTodo(mode === "success" ? true : false);
          },
          enabled: false,
          retry: 0,
        }),
      ),
    },
    {
      validationTrigger: "onSubmit",
    },
  );
  return view;
};
