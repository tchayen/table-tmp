import * as React from "react";
import { formatDistance } from "date-fns";

import { Table } from "./Table";

const colors = [
  ["#3B0A2A", "#F9D8EC"],
  ["#00254D", "#CEE7FE"],
  ["#153226", "#CCEBD7"],
  ["#451E11", "#FFDCC3"],
];

function Avatar({ username }: { username: string }) {
  const [textColor, backgroundColor] =
    colors[username[0].charCodeAt(0) % colors.length];
  return (
    <div className="px-6 py-3 flex gap-2 items-center">
      <div
        className="h-10 w-10 rounded-full flex justify-center items-center font-bold text-white"
        style={{
          color: textColor,
          backgroundColor,
        }}
      >
        {username[0]}
      </div>
      {username}
    </div>
  );
}

export default function App() {
  return (
    <>
      <Table
        title="Runtime"
        columns={{
          commit: { title: "Commit" },
          platform: { title: "Platform" },
          author: {
            title: "Author",
            renderCell: (props) => {
              return <Avatar username={props.username} />;
            },
          },
        }}
        data={[
          {
            commit: { message: "This will show up as [object Object]" },
            platform: "Android",
            author: { username: "Alice" },
          },
          {
            commit:
              "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
            platform: "iOS",
            author: { username: "Bob" },
          },
          {
            commit: "ghi",
            platform: "Android",
            author: { username: "Charlie" },
          },
          {
            commit:
              "Expo is a free and open-source platform for building native mobile applications using React Native. It provides a set of tools and services that simplify the development process, allowing developers to create high-quality apps without needing to manage complex configuration or build processes. Expo offers features such as live reloading, a visual interface for building user interfaces, and easy integration with third-party services like authentication and push notifications. Additionally, Expo offers a cloud-based build service that allows developers to easily build and distribute their apps to both iOS and Android platforms. Overall, Expo provides a streamlined and efficient way for developers to build mobile apps that can be deployed quickly and easily.",
            platform: "iOS",
            author: { username: "Dave" },
          },
        ]}
      />
      <Table
        columns={{
          build: {
            title: "Build",
            renderCell: (props) => {
              return (
                <div className="px-6 py-3 self-center">
                  <div>{props.platform} App Store Build</div>
                  <div className="text-gray-500 text-sm">
                    {formatDistance(props.timestamp, +new Date(), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              );
            },
          },
          status: {
            title: "Status",
            renderHeader: ({ title }) => {
              return (
                <div className="flex gap-2 items-center text-xs font-medium text-gray-500 px-6 py-3">
                  {title}
                  <img src="/question.svg" className="w-4 h-4" alt="?" />
                </div>
              );
            },
          },
          profile: { title: "Profile" },
          commit: {
            title: "Commit",
            renderCell: (props) => {
              return (
                <div className="px-6 py-3 self-center">
                  <div>"{props.message}"</div>
                  <div className="text-gray-500 text-sm">{props.hash}</div>
                </div>
              );
            },
          },
        }}
        data={[
          {
            build: { platform: "iOS", timestamp: +new Date() - 1_000_000 },
            status: "queued",
            profile: "production",
            commit: { hash: "633f3v", message: "Bump version" },
          },
        ]}
      />
      <Table
        title="Custom grid columns size"
        description="Use only if you know what you are doing."
        columns={{
          id: { title: "ID" },
          groupId: { title: "Group ID" },
          appId: { title: "App ID" },
        }}
        data={[
          {
            id: "18ea2477-4f5e-4b2d-ba28-e590dc044a27",
            groupId: "ea28e8b7-ab07-44f5-b90a-acccd9833a94",
            appId: "da4dee4f-a48f-4f33-82c3-74ee0b797d90",
          },
        ]}
        overrideGridTemplateColumns="repeat(3, 1fr)"
      />
    </>
  );
}
