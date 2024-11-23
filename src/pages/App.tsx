import { Fragment } from 'react';
import { Button } from "@/components/ui/button"
import { HStack } from '@chakra-ui/react';
function App() {
  return (
  <Fragment>
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <HStack>
      <Button>teste</Button>
    </HStack>
    </div>
  </Fragment>
 
  )
}

export default App;
