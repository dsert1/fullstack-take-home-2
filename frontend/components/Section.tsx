"use client"
import { Disclosure } from "@headlessui/react"
import FilePicker from "./FilePicker"
import Preview from "./Preview"
import { usePortfolio } from "../hooks/usePortfolio"

export default function Section({ name }: { name: string }) {
  const [state] = usePortfolio()
  const section = state.sections.find(s => s.name === name)

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="py-2 w-full text-left font-semibold">
            {open ? "▼" : "►"} {name}
          </Disclosure.Button>
          <Disclosure.Panel>
            <FilePicker section={name} />
            {section?.items.map(item => (
              <Preview key={item.id} item={item} />
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
