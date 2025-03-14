import {
  MxLabelWithTag,
  MxLabelWithTagProps,
} from "@/framework/components/mui";
import { Meta, StoryObj } from "@storybook/react";

/**
 * タグ付きのラベルを単体で表示するためのコンポーネントです。
 */
const meta: Meta<typeof MxLabelWithTag> = {
  title: "Material UI/MxLabelWithTag",
  component: MxLabelWithTag,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: `ラベル名を指定します。`,
      table: {
        type: { summary: "string | ReactNode" },
      },
    },
    required: {
      control: "boolean",
      description:
        "必須タグ/任意タグのどちらを表示するかを指定します。`true`の場合は必須タグ、`false`の場合は任意タグが表示されます。",
    },
    showRequiredTag: {
      control: "radio",
      description:
        "必須タグ/任意タグの表示有無を指定します。`required`の場合は必須タグのみ、" +
        "`optional`の場合は任意タグのみ表示されます。`both`の場合は必須と任意両方のタグが表示されます。" +
        "`none`の場合はタグが表示されません。<br>" +
        "必須か任意かは、`required`propsの値が`true`であるかに依存します。",
      table: {
        defaultValue: { summary: "both" },
      },
    },
    color: {
      control: "color",
      description: `ラベルの文字色を指定します。`,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<MxLabelWithTagProps> = {
  label: "ラベル",
  required: true,
  showRequiredTag: "both",
};

export const MxLabelWithTagStory: Story = {
  args: defaultArgs,
  render: function Render(args: MxLabelWithTagProps) {
    return <MxLabelWithTag {...args} />;
  },
};
