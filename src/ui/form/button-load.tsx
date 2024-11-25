import { Stack } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
export function ButtonInput({
  title,
  click,
}: {
  title: string;
  click: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Stack direction="row" gap="4" align="center">
      <Button className="bg-[#FA6900] text-white p-3" onClick={click}>
        {title}
      </Button>
    </Stack>
  );
}

export function ButtonLoad() {
  return (
    <Stack direction="row" gap="4" align="center">
      <Button loading loadingText="Buscando..." />
    </Stack>
  );
}
