/* tslint:disable */
/* eslint-disable */
/**
 * Household savings
 * This is the API for a household savings model. You can provide details about a household\'s energy use, and receive information about the household\'s potential emissions & cost savings from electrifying their fossil fuel machines, as well as the upfront costs of switching.
 *
 * The version of the OpenAPI document: 0.0.7
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from "./configuration";
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from "axios";
import globalAxios from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from "./common";
import type { RequestArgs } from "./base";
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  BaseAPI,
  RequiredError,
  operationServerMap,
} from "./base";

/**
 * The household\'s home battery system
 * @export
 * @interface Battery
 */
export interface Battery {
  /**
   * Whether the household has battery
   * @type {boolean}
   * @memberof Battery
   */
  hasBattery: boolean;
  /**
   * The capacity of the battery system in kWh. Should be null if hasBattery is False and installBattery is False.
   * @type {number}
   * @memberof Battery
   */
  capacity?: number;
  /**
   * The continuous power output of the battery system in kW. Should be null if hasBattery is False and installBattery is False.
   * @type {number}
   * @memberof Battery
   */
  powerOutput?: number;
  /**
   * The peak power output of the battery system in kW. Should be null if hasBattery is False and installBattery is False.
   * @type {number}
   * @memberof Battery
   */
  peakPowerOutput?: number;
  /**
   * Whether the household wants to install a battery. Should be null is hasBattery is True.
   * @type {boolean}
   * @memberof Battery
   */
  installBattery?: boolean;
}
/**
 * The main energy source for cooking
 * @export
 * @enum {string}
 */

export const CooktopEnum = {
  Gas: "GAS",
  Lpg: "LPG",
  ElectricResistance: "ELECTRIC_RESISTANCE",
  ElectricInduction: "ELECTRIC_INDUCTION",
} as const;

export type CooktopEnum = (typeof CooktopEnum)[keyof typeof CooktopEnum];

/**
 *
 * @export
 * @interface Emissions
 */
export interface Emissions {
  /**
   *
   * @type {EmissionsValues}
   * @memberof Emissions
   */
  perWeek?: EmissionsValues;
  /**
   *
   * @type {EmissionsValues}
   * @memberof Emissions
   */
  perYear?: EmissionsValues;
  /**
   *
   * @type {EmissionsValues}
   * @memberof Emissions
   */
  overLifetime?: EmissionsValues;
  /**
   * The assumed operational lifetime of the machines in years
   * @type {number}
   * @memberof Emissions
   */
  operationalLifetime?: number;
}
/**
 *
 * @export
 * @interface EmissionsValues
 */
export interface EmissionsValues {
  /**
   * The household\'s emissions per week before electrification in kg CO2e to 2 dp.
   * @type {number}
   * @memberof EmissionsValues
   */
  before?: number;
  /**
   * The household\'s emissions per week after electrification in kg CO2e to 2 dp.
   * @type {number}
   * @memberof EmissionsValues
   */
  after?: number;
  /**
   * The difference in emissions before & after electrification, in kg CO2e to 2 dp.
   * @type {number}
   * @memberof EmissionsValues
   */
  difference?: number;
}
/**
 *
 * @export
 * @interface Household
 */
export interface Household {
  /**
   *
   * @type {LocationEnum}
   * @memberof Household
   */
  location?: LocationEnum;
  /**
   * Number of occupants
   * @type {number}
   * @memberof Household
   */
  occupancy?: number;
  /**
   *
   * @type {SpaceHeatingEnum}
   * @memberof Household
   */
  spaceHeating?: SpaceHeatingEnum;
  /**
   *
   * @type {WaterHeatingEnum}
   * @memberof Household
   */
  waterHeating?: WaterHeatingEnum;
  /**
   *
   * @type {CooktopEnum}
   * @memberof Household
   */
  cooktop?: CooktopEnum;
  /**
   *
   * @type {Array<Vehicle>}
   * @memberof Household
   */
  vehicles?: Array<Vehicle>;
  /**
   *
   * @type {Solar}
   * @memberof Household
   */
  solar?: Solar;
  /**
   *
   * @type {Battery}
   * @memberof Household
   */
  battery?: Battery;
}

/**
 * Where the household is located
 * @export
 * @enum {string}
 */

export const LocationEnum = {
  Northland: "NORTHLAND",
  AucklandNorth: "AUCKLAND_NORTH",
  AucklandCentral: "AUCKLAND_CENTRAL",
  AucklandEast: "AUCKLAND_EAST",
  AucklandWest: "AUCKLAND_WEST",
  AucklandSouth: "AUCKLAND_SOUTH",
  Waikato: "WAIKATO",
  BayOfPlenty: "BAY_OF_PLENTY",
  Gisborne: "GISBORNE",
  HawkesBay: "HAWKES_BAY",
  Taranaki: "TARANAKI",
  ManawatuWanganui: "MANAWATU_WANGANUI",
  Wellington: "WELLINGTON",
  Tasman: "TASMAN",
  Nelson: "NELSON",
  Marlborough: "MARLBOROUGH",
  WestCoast: "WEST_COAST",
  Canterbury: "CANTERBURY",
  Otago: "OTAGO",
  Southland: "SOUTHLAND",
  StewartIsland: "STEWART_ISLAND",
  ChathamIslands: "CHATHAM_ISLANDS",
  GreatBarrierIsland: "GREAT_BARRIER_ISLAND",
  Overseas: "OVERSEAS",
  Other: "OTHER",
} as const;

export type LocationEnum = (typeof LocationEnum)[keyof typeof LocationEnum];

/**
 *
 * @export
 * @interface Opex
 */
export interface Opex {
  /**
   *
   * @type {OpexValues}
   * @memberof Opex
   */
  perWeek?: OpexValues;
  /**
   *
   * @type {OpexValues}
   * @memberof Opex
   */
  perYear?: OpexValues;
  /**
   *
   * @type {OpexValues}
   * @memberof Opex
   */
  overLifetime?: OpexValues;
  /**
   * The assumed operational lifetime of the machines in years
   * @type {number}
   * @memberof Opex
   */
  operationalLifetime?: number;
}
/**
 *
 * @export
 * @interface OpexValues
 */
export interface OpexValues {
  /**
   * The household\'s opex costs per week before electrification in NZD to 2 dp.
   * @type {number}
   * @memberof OpexValues
   */
  before?: number;
  /**
   * The household\'s opex costs per week after electrification in NZD to 2 dp.
   * @type {number}
   * @memberof OpexValues
   */
  after?: number;
  /**
   * The difference in opex costs before & after electrification, in NZD to 2 dp.
   * @type {number}
   * @memberof OpexValues
   */
  difference?: number;
}
/**
 *
 * @export
 * @interface Recommendation
 */
export interface Recommendation {
  /**
   *
   * @type {RecommendationActionEnum}
   * @memberof Recommendation
   */
  action: RecommendationActionEnum;
  /**
   * A URL to a resource to give more information about this recommended action.
   * @type {string}
   * @memberof Recommendation
   */
  url?: string;
}

/**
 * The recommended action for this household to maximise their savings
 * @export
 * @enum {string}
 */

export const RecommendationActionEnum = {
  SpaceHeating: "SPACE_HEATING",
  WaterHeating: "WATER_HEATING",
  Cooking: "COOKING",
  Vehicle: "VEHICLE",
  Solar: "SOLAR",
  Battery: "BATTERY",
  FullyElectrified: "FULLY_ELECTRIFIED",
} as const;

export type RecommendationActionEnum =
  (typeof RecommendationActionEnum)[keyof typeof RecommendationActionEnum];

/**
 *
 * @export
 * @interface Savings
 */
export interface Savings {
  /**
   *
   * @type {Emissions}
   * @memberof Savings
   */
  emissions?: Emissions;
  /**
   *
   * @type {Opex}
   * @memberof Savings
   */
  opex?: Opex;
  /**
   *
   * @type {UpfrontCost}
   * @memberof Savings
   */
  upfrontCost?: UpfrontCost;
  /**
   *
   * @type {Recommendation}
   * @memberof Savings
   */
  recommendation?: Recommendation;
}
/**
 * The household\'s solar panel system
 * @export
 * @interface Solar
 */
export interface Solar {
  /**
   * Whether the household has solar
   * @type {boolean}
   * @memberof Solar
   */
  hasSolar: boolean;
  /**
   * The size of the solar panel system in kW. Should be null if hasSolar is False and installSolar is False.
   * @type {number}
   * @memberof Solar
   */
  size?: number;
  /**
   * Whether the household wants to install solar. Should be null if hasSolar is True.
   * @type {boolean}
   * @memberof Solar
   */
  installSolar?: boolean;
}
/**
 * The main method of space heating
 * @export
 * @enum {string}
 */

export const SpaceHeatingEnum = {
  Wood: "WOOD",
  Gas: "GAS",
  Lpg: "LPG",
  ElectricResistance: "ELECTRIC_RESISTANCE",
  ElectricHeatPump: "ELECTRIC_HEAT_PUMP",
} as const;

export type SpaceHeatingEnum =
  (typeof SpaceHeatingEnum)[keyof typeof SpaceHeatingEnum];

/**
 * The estimated total NZD cost of electrifying the household
 * @export
 * @interface UpfrontCost
 */
export interface UpfrontCost {
  /**
   * The estimated cost of installing solar in NZD
   * @type {number}
   * @memberof UpfrontCost
   */
  solar?: number;
  /**
   * The estimated cost of installing a battery in NZD
   * @type {number}
   * @memberof UpfrontCost
   */
  battery?: number;
  /**
   * The estimated cost of switching to cooktop in NZD
   * @type {number}
   * @memberof UpfrontCost
   */
  cooktop?: number;
  /**
   * The estimated cost of switching to waterHeating in NZD
   * @type {number}
   * @memberof UpfrontCost
   */
  waterHeating?: number;
  /**
   * The estimated cost of switching to spaceHeating in NZD
   * @type {number}
   * @memberof UpfrontCost
   */
  spaceHeating?: number;
}
/**
 *
 * @export
 * @interface Vehicle
 */
export interface Vehicle {
  /**
   *
   * @type {VehicleFuelTypeEnum}
   * @memberof Vehicle
   */
  fuelType: VehicleFuelTypeEnum;
  /**
   * Typical kilometres driven per week by this vehicle
   * @type {number}
   * @memberof Vehicle
   */
  kmsPerWeek?: number;
  /**
   * Whether the household wants to switch to EV
   * @type {boolean}
   * @memberof Vehicle
   */
  switchToEV?: boolean;
}

/**
 *
 * @export
 * @enum {string}
 */

export const VehicleFuelTypeEnum = {
  Electric: "ELECTRIC",
  PlugInHybrid: "PLUG_IN_HYBRID",
  Hybrid: "HYBRID",
  Petrol: "PETROL",
  Diesel: "DIESEL",
} as const;

export type VehicleFuelTypeEnum =
  (typeof VehicleFuelTypeEnum)[keyof typeof VehicleFuelTypeEnum];

/**
 * The method of water heating
 * @export
 * @enum {string}
 */

export const WaterHeatingEnum = {
  Gas: "GAS",
  Lpg: "LPG",
  ElectricResistance: "ELECTRIC_RESISTANCE",
  ElectricHeatPump: "ELECTRIC_HEAT_PUMP",
  Solar: "SOLAR",
} as const;

export type WaterHeatingEnum =
  (typeof WaterHeatingEnum)[keyof typeof WaterHeatingEnum];

/**
 * SavingsApi - axios parameter creator
 * @export
 */
export const SavingsApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     * Calculate the emissions savings, opex savings, and the upfront cost from electrifying a given household.
     * @summary Calculate savings & get upfront cost
     * @param {Household} household Input a household\&#39;s energy behaviour
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    calculateSavings: async (
      household: Household,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'household' is not null or undefined
      assertParamExists("calculateSavings", "household", household);
      const localVarPath = `/savings`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        household,
        localVarRequestOptions,
        configuration,
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * SavingsApi - functional programming interface
 * @export
 */
export const SavingsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = SavingsApiAxiosParamCreator(configuration);
  return {
    /**
     * Calculate the emissions savings, opex savings, and the upfront cost from electrifying a given household.
     * @summary Calculate savings & get upfront cost
     * @param {Household} household Input a household\&#39;s energy behaviour
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async calculateSavings(
      household: Household,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Savings>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.calculateSavings(household, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["SavingsApi.calculateSavings"]?.[
          localVarOperationServerIndex
        ]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * SavingsApi - factory interface
 * @export
 */
export const SavingsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = SavingsApiFp(configuration);
  return {
    /**
     * Calculate the emissions savings, opex savings, and the upfront cost from electrifying a given household.
     * @summary Calculate savings & get upfront cost
     * @param {Household} household Input a household\&#39;s energy behaviour
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    calculateSavings(
      household: Household,
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<Savings> {
      return localVarFp
        .calculateSavings(household, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * SavingsApi - object-oriented interface
 * @export
 * @class SavingsApi
 * @extends {BaseAPI}
 */
export class SavingsApi extends BaseAPI {
  /**
   * Calculate the emissions savings, opex savings, and the upfront cost from electrifying a given household.
   * @summary Calculate savings & get upfront cost
   * @param {Household} household Input a household\&#39;s energy behaviour
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SavingsApi
   */
  public calculateSavings(
    household: Household,
    options?: RawAxiosRequestConfig,
  ) {
    return SavingsApiFp(this.configuration)
      .calculateSavings(household, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
