import type { Meta, StoryObj } from "@storybook/react";

import LockKeyFillIcon from "@/assets/icons/lock-key-fill.svg";
import {
  Modal,
  ModalActionButton,
  ModalActions,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalIcon,
  ModalTitle,
} from "@/shared/ui";

type ModalStoryArgs = {
  padding?: "md" | "lg";
};

const meta = {
  title: "UI/Modal",
  args: {
    padding: "md",
  },
  argTypes: {
    padding: {
      control: "radio",
      options: ["md", "lg"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[520px] items-center justify-center bg-bg-02 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<ModalStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoginRequired: Story = {
  render: ({ padding }) => (
    <Modal padding={padding}>
      <ModalHeader align="center">
        <ModalIcon className="bg-indigo-100">
          <LockKeyFillIcon aria-hidden className="size-8 fill-primary-default" />
        </ModalIcon>
        <ModalTitle>Login required</ModalTitle>
        <ModalDescription>commetns</ModalDescription>
      </ModalHeader>
      <ModalFooter>
        <ModalActions
          layout="stacked"
          primary={<ModalActionButton variant="primary">Login Button</ModalActionButton>}
          secondary={<ModalActionButton variant="inactive">Close Button</ModalActionButton>}
        />
      </ModalFooter>
    </Modal>
  ),
};

export const ConfirmDoubleAction: Story = {
  render: ({ padding }) => (
    <Modal padding={padding}>
      <ModalHeader>
        <ModalTitle>Title</ModalTitle>
        <ModalDescription>commetns</ModalDescription>
      </ModalHeader>
      <ModalFooter>
        <ModalActions
          layout="double"
          secondary={<ModalActionButton variant="inactive">Cancel Button</ModalActionButton>}
          primary={<ModalActionButton variant="danger">Button</ModalActionButton>}
        />
      </ModalFooter>
    </Modal>
  ),
};

export const SingleAction: Story = {
  render: ({ padding }) => (
    <Modal padding={padding}>
      <ModalHeader>
        <ModalTitle>Title</ModalTitle>
        <ModalDescription>commetns</ModalDescription>
      </ModalHeader>
      <ModalFooter>
        <ModalActions layout="single" primary={<ModalActionButton variant="primary">Button</ModalActionButton>} />
      </ModalFooter>
    </Modal>
  ),
};

export const SingleDisabled: Story = {
  render: ({ padding }) => (
    <Modal padding={padding}>
      <ModalHeader align="center">
        <ModalTitle>Title</ModalTitle>
        <ModalDescription>Comments</ModalDescription>
      </ModalHeader>
      <ModalFooter>
        <ModalActions
          layout="single"
          primary={
            <ModalActionButton variant="disabled" disabled>
              Button
            </ModalActionButton>
          }
        />
      </ModalFooter>
    </Modal>
  ),
  parameters: {
    docs: {
      description: {
        story: "",
      },
    },
  },
};
