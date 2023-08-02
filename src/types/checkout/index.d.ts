export interface Card {
  card: Card;
  client_ip: string;
  created: number;
  id: string;
  livemode: boolean;
  object: string;
  type: string;
  used: boolean;
}

export interface Card {
  address_city: any;
  address_country: any;
  address_line1: any;
  address_line1_check: any;
  address_line2: any;
  address_state: any;
  address_zip: any;
  address_zip_check: any;
  brand: string;
  country: string;
  cvc_check: string;
  dynamic_last4: any;
  exp_month: number;
  exp_year: number;
  funding: string;
  id: string;
  last4: string;
  name: string;
  object: string;
  tokenization_method: any;
  wallet: any;
}
export type CheckoutStackNavigatorParamList = {
  Checkout: undefined;
  CheckoutSuccess: undefined;
  CheckoutError: { error: string };
};
