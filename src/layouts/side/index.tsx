import { Fragment, useEffect, useState } from 'react';
import { IRidesListRideResponse } from '@/shared/entities/rides';
import { FaUserAlt } from 'react-icons/fa';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa';
import { formatDate, formatDistance } from '@/shared/helpers/utils';
import { BsCalendar2Date } from 'react-icons/bs';
import { RidesApi } from '@/shared/api/ride';
export function Side() {
  const [rides, setRides] = useState<IRidesListRideResponse | undefined>(
    undefined,
  );
  const [driverId, setDriverId] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState('');

  async function getRides() {
    setMessage('Buscando...');

    setRides(undefined);

    if (driverId) {
      const ridesApi = new RidesApi();

      const resultRides = await ridesApi.listRides(1, parseInt(driverId));

      if (!resultRides?.error_code) {
        resultRides.rides.sort(
          (a: { id: number }, b: { id: number }) => b.id - a.id,
        );
        setRides(resultRides);
      }
    }

    setMessage('');
  }

  useEffect(() => {
    getRides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driverId]);

  return (
    <Fragment>
      <nav className="h-lvh relative flex">
        <div className="fixed inset-y-0 left-0 w-[400px] overflow-auto p-10 border-right-orange background-orange">
          <div className="flex gap-3">
            <FaUserAlt className="text-[32px] mt-3" />
            <h1 className="text-[32px]">User</h1>
          </div>
          <div className="pt-10">
            <p className="pb-8">Últimas corridas</p>
            <div className="pb-8">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setDriverId(e.target.value)}
              >
                <option defaultChecked>Selecionar motorista</option>
                <option value="1">Homer Simpson</option>
                <option value="2">Dominic Toretto</option>
                <option value="3">James Bond</option>
              </select>
              {message ? <p className="pt-2">{message}</p> : ''}
            </div>
            {rides ? (
              rides.rides.map((e) => (
                <AccordionRoot key={e.id} collapsible={true}>
                  <AccordionItem value={e.origin}>
                    <AccordionItemTrigger className="px-5">
                      <div className="flex gap-8 pb-10 items-center">
                        <FaChevronDown />
                        <div className="text-left">
                          <p className="text-[12px] flex gap-2">
                            <BsCalendar2Date /> {formatDate(e.date)}
                          </p>
                          <p>Origem: {e.origin}</p>
                          <p>Destino: {e.destination}</p>
                        </div>
                      </div>
                    </AccordionItemTrigger>

                    <AccordionItemContent className="pl-[80px] pb-[40px]">
                      <p>Valor: R${e.value}</p>
                      <p>Motorista: {e.driver.name}</p>
                      <p>Distância: {formatDistance(e.distance)}</p>
                      <p>Tempo: {e.duration}</p>
                    </AccordionItemContent>
                  </AccordionItem>
                </AccordionRoot>
              ))
            ) : (
              <div>
                <p>Nenhuma corrida encontrada</p>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </nav>
    </Fragment>
  );
}
