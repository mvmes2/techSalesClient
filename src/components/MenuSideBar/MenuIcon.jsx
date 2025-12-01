import * as Tooltip from "@radix-ui/react-tooltip";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

export const Trigger = styled(Tooltip.Trigger)`
  background: none;
  border: 0;
  font-size: 1.25rem;

  cursor: pointer;

  ${(props) => props.$isActive && `
  color: #b5ed0b;
  `}

  &:hover {
    color: #f30c0c;
  }
`;

export const Content = styled(Tooltip.Content)`
  background: #f40707;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;

  border: 1px solid blue;
  border-radius: 4px;
  padding: 0.25rem;
  margin-left: 0.5rem;
`;

export function MenuIcon({ title, content, toUrl }) {
  const pathname = usePathname();
  const { push } = useRouter();

  function handleSelectPage() {
    try {
      push(toUrl);

    } catch (err) {

    }
  }

  const compareUrl = pathname.includes(toUrl);

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Trigger onClick={handleSelectPage} $isActive={compareUrl}>
          {title}
        </Trigger>
        <Tooltip.Portal>
          <Content side="right">{content}</Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
