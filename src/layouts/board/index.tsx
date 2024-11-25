import { Input } from '@/ui/form/input';
import { useEffect, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { ButtonInput, ButtonLoad } from '@/ui/form/button-load';
import { RidesApi } from '@/shared/api/ride';
import { IRidesEstimateResponse } from '@/shared/entities/rides';
import { formatDistance } from '../../shared/helpers/utils';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@chakra-ui/react';
import { FaChevronDown, FaStar } from 'react-icons/fa';
import { Toaster, toaster } from '@/components/ui/toaster';

const ridesApi = new RidesApi();

export function Board() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState('');
  const [loadButton, setLoadButton] = useState(false);
  const [rides, setRides] = useState<IRidesEstimateResponse>();
  const [map, setMap] = useState(false);
  const [lastRides, setLastRides] = useState<{
    origin: string,
    destination: string
  } | undefined>();

  async function searchRide() {
    setLoadButton(true);

    const body = {
      customer_id: 1,
      origin,
      destination,
    };

    const getRides = (await ridesApi.estimate(body)) as IRidesEstimateResponse;

    if (getRides?.error_code) {
      toaster.error({
        title: getRides?.error_code,
        description: getRides?.error_description,
      });
    } else {
      const { distance, duration } = getRides;
      setDistance(distance);
      setDuration(duration);
      setMap(true);
      setRides(getRides);
    }

    setLoadButton(false);
  }

  async function confirmRide(
    id_driver: number,
    name_driver: string,
    value: number,
  ) {
    const result = await ridesApi.confirm({
      customer_id: 1,
      destination: destination,
      origin: origin,
      distance: distance,
      driver: {
        id: id_driver,
        name: name_driver,
      },
      duration: duration,
      value: value,
    });

    if (result.error_code) {
      toaster.error({
        title: result?.error_code,
        description: result.error_description,
      });

      return;
    }

    toaster.success({
      title: 'successo',
      description: 'Corrida confirmada com sucesso',
    });

    setRides(undefined);
    setMap(false);
    setLastRides({
      origin, 
      destination
    })
  }

  useEffect(() => {}, [origin, destination]);

  return (
    <Fragment>
      <Toaster />
      <div className="p-6">
        <h2 className="text-[20px] pb-2">Nova corrida</h2>
        <section className={map ? 'grid grid-cols-2' : ''}>
          <div className="flex flex-col gap-3">
            <Input placeholder="Origem" change={setOrigin} />
            {rides ? (
              <div className="flex gap-8 text-[13px] text-blue-500">
                <span>latitude: {rides.origin.latitude}</span>
                <span>longitude: {rides.origin.longitude}</span>
              </div>
            ) : (
              ''
            )}
            <Input placeholder="Destino" change={setDestination} />
            {rides ? (
              <div className="flex gap-8 text-[13px] text-blue-500">
                <span>latitude: {rides.destination.latitude}</span>
                <span>longitude: {rides.destination.longitude}</span>
              </div>
            ) : (
              ''
            )}
            {!loadButton ? (
              <ButtonInput title="Buscar corrida" click={searchRide} />
            ) : (
              <ButtonLoad />
            )}
          </div>{' '}
          {map ? (
            <div className="flex justify-center">
              <img
                width="250"
                className="rounded mt-[-30px]"
                src="images/static-map.avif"
                alt="static-map"
              />
            </div>
          ) : (
            ''
          )}
        </section>
        <section>
          {rides ? (
            <div>
              <div className="pt-5 flex gap-8 text-[14px]">
                <span>Distância: {formatDistance(rides.distance)}</span>
                <span>Tempo: {rides.duration}</span>
              </div>
            </div>
          ) : (
            ''
          )}
        </section>
        <section>
          {rides ? (
            <div>
              {rides.options ? (
                <div>
                  <h3 className="text-[18px] pb-5 pt-8">Opções de corrida</h3>
                  {rides.options.map((option, index) => (
                    <AccordionRoot key={index} collapsible={true}>
                      <AccordionItem value={option.name}>
                        <AccordionItemTrigger className="px-5">
                          <div className="flex gap-8 pb-10 items-center">
                            <FaChevronDown />
                            <div className="text-left grid gap-2 grid-cols-2">
                              <div className="w-[20em]">
                                <div className="flex gap-2">
                                  <FaStar color="orange" />
                                  <span className="mt-[-3px]">
                                    {option.review.rating}
                                  </span>
                                </div>
                                <p>Motorista: {option.name}</p>
                                <p>
                                  Valor: R${' '}
                                  {option.value.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                  })}
                                </p>
                              </div>
                              <button
                                className="bg-[#FA6900] text-white rounded h-[40px]"
                                onClick={() =>
                                  confirmRide(
                                    option.id,
                                    option.name,
                                    option.value,
                                  )
                                }
                              >
                                Confirmar
                              </button>
                            </div>
                          </div>
                        </AccordionItemTrigger>

                        <AccordionItemContent className="pl-[80px] pb-[40px] flex flex-col gap-8">
                          <p>Carro: {option.vehicle}</p>
                          <p>Avaliação: {option.review.comment}</p>
                          <p>Sobre: {option.description}</p>
                        </AccordionItemContent>
                      </AccordionItem>
                    </AccordionRoot>
                  ))}
                </div>
              ) : (
                'Nenhum motorista encontrado para essa rota'
              )}
            </div>
          ) : (
            ''
          )}
        </section>
        <section>
          { lastRides ? (
            <div className="pt-20">
              <h3 className="pb-5 font-bold">Última corrida</h3>
              <div className="flex flex-col gap-3 text-[14px]">
                <p>Origem: {lastRides.origin}</p>
                <p>Destino: {lastRides.destination}</p>
              </div>
            </div>
          ) : ''}
        </section>
      </div>
    </Fragment>
  );
}
