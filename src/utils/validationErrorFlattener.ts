export default function validationErrorFlattener(value: string) {
  const data: { path: string; message: string[] }[] = [];
  JSON.parse(value)
    .map((e: any) => ({
      path: typeof e.path === "string" ? e.path : e.path[0],
      message: e.message,
    }))
    .map((e: any) => {
      if (
        data.length > 0 &&
        Object.values(data)
          .map((e) => e.path)
          .includes(e.path)
      ) {
        let index = Object.values(data)
          .map((e) => e.path)
          .indexOf(e.path);
        data?.[index]?.message.push(e.message);
      } else if (
        !Object.values(data)
          .map((e) => e.path)
          .includes(e.path)
      ) {
        let length = data.length;
        data[length] = { path: e.path, message: [e.message] };
      }
    });
  return data;
}
