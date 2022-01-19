/* eslint-disable import/no-duplicates */

declare module "*.vue" {
  import { defineComponent } from "vue"
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
interface Window {
  api: { receive: (channel: string, func: Function) => void }
}
