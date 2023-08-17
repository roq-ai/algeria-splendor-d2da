import { CarInterface } from 'interfaces/car';
import { FlightInterface } from 'interfaces/flight';
import { HotelInterface } from 'interfaces/hotel';
import { OfferInterface } from 'interfaces/offer';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StartupInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  car?: CarInterface[];
  flight?: FlightInterface[];
  hotel?: HotelInterface[];
  offer?: OfferInterface[];
  user?: UserInterface;
  _count?: {
    car?: number;
    flight?: number;
    hotel?: number;
    offer?: number;
  };
}

export interface StartupGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
