import React, { useEffect, useRef, useState } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  FormProvider,
} from "react-hook-form";

// ----------------- Styles & Material-UI -------------------
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import "./HouseholdForm.css";
import { FDivider } from "src/shared/styles/FDivider";

// ----------------- Models & Interfaces -------------------
import {
  CooktopEnum,
  Household,
  LocationEnum,
  SpaceHeatingEnum,
  Vehicle,
  VehicleFuelTypeEnum,
  WaterHeatingEnum,
} from "../../shared/api/openapi-client";
import {
  HouseholdFormState,
  Option,
  OptionNumber,
  OptionYesNo,
  UsageOption,
  UsageType,
  VehicleObject,
} from "./data/interfaces";

// ----------------- Data -------------------
import {
  electrificationStatusMapping,
  formText,
} from "./data/householdForm.text";

// ----------------- Icons -------------------
import questionIcon from "../../assets/icons/question.svg";
import resetIcon from "../../assets/icons/carbon-reset.svg";
import { ReactComponent as chevronDown } from "../../assets/icons/chevron-down.svg";

// ----------------- Components -------------------
import {
  FormBox,
  HalfWidthFormBox,
  FormContainer,
  FormSectionFlex,
  FormSectionGrid,
  ResetButton,
  SwitchLabel,
  HouseSelect,
  HouseInputAdornment,
  LabelBox,
} from "./HouseholdForm.styles";
import VehicleBox from "./components/HouseholdVehicle";
import HouseholdTooltip from "./components/HouseholdTooltip";
import { HouseRadio } from "./components/HouseCheckRadio";
import { HouseSwitch } from "./components/HouseSwitch";
import HouseMenuItem from "./components/HouseMenuItem";
import { defaultFormState } from "src/assets/data/householdDefaults";

interface HouseholdFormProps {
  householdData: Household;
  updateHouseholdData: (data: Household) => void;
}

const HouseholdForm: React.FC<HouseholdFormProps> = ({
  householdData,
  updateHouseholdData,
}) => {
  const theme = useTheme();

  // ------------- Tooltip -------------------
  const tooltipText = formText.tooltipText;

  // ----------------- Default State -----------------

  const defaultFormData = formText.defaultFormState;

  const methods = useForm<HouseholdFormState>({
    defaultValues: {
      location: householdData?.location ?? defaultFormData.location,
      occupancy: householdData?.occupancy ?? defaultFormData.occupancy,
      spaceHeating: householdData?.spaceHeating ?? defaultFormData.spaceHeating,
      waterHeating: householdData?.waterHeating ?? defaultFormData.waterHeating,
      cooktop: householdData?.cooktop ?? defaultFormData.cooktop,
      numberOfVehicles:
        householdData?.vehicles?.length ?? defaultFormData.vehicleObjs.length,
      vehicleObjs: householdData?.vehicles ?? defaultFormData.vehicleObjs,
      solar: {
        hasSolar: Boolean(
          householdData?.solar?.hasSolar ?? defaultFormData.solar.hasSolar,
        ),
        size: householdData?.solar?.size ?? defaultFormData.solar.size,
        installSolar:
          householdData?.solar?.installSolar ??
          defaultFormData.solar.installSolar,
      },
      battery: {
        hasBattery: Boolean(
          householdData?.battery?.hasBattery ??
            defaultFormData.battery.hasBattery,
        ),
        capacity:
          householdData?.battery?.capacity ?? defaultFormData.battery.capacity,
        installBattery:
          householdData?.battery?.installBattery ??
          defaultFormData.battery.installBattery,
      },
    },
  });

  const { control, setValue, getValues, watch } = methods;

  const watchAllFields: HouseholdFormState = watch();

  // -------------------------------------------------------------------
  // solar state
  const watchHasSolar = watch("solar.hasSolar");
  const watchInstallSolar = watch("solar.installSolar");
  const [solarSize, setSolarSize] = useState<number>(
    defaultFormData.solar.size,
  ); // This is used with onBlur to stop the form updating while the user is typing
  const [disableBatteryFields, setDisableBatteryFields] = useState(false); // Disable battery fields if no solar

  useEffect(() => {
    if (watchHasSolar) {
      setValue("solar.installSolar", false);
      setDisableBatteryFields(false);
    } else {
      setValue("solar.installSolar", true);
    }
  }, [watchHasSolar, setValue]);

  useEffect(() => {
    updateFormData(getValues());
    if (!watchHasSolar) {
      setDisableBatteryFields(!watchInstallSolar); // if they don't have solar and don't want to install solar, turn off & disable battery fields
      if (!watchInstallSolar) {
        setValue("battery.installBattery", false);
      }
    }
  }, [watchInstallSolar]);

  useEffect(() => {}, [solarSize]);

  // -------------------------------------------------------------------
  // battery state
  const watchHasBattery = watch("battery.hasBattery");
  const watchInstallBattery = watch("battery.installBattery");
  const [batteryCapacity, setBatteryCapacity] = useState<number>(
    defaultFormData.battery.capacity,
  ); // This is used with onBlur to stop the form updating while the user is typing

  useEffect(() => {
    if (watchHasBattery) {
      setValue("battery.installBattery", false);
    } else {
      setValue("battery.installBattery", true);
    }
  }, [watchHasBattery, setValue]);

  useEffect(() => {
    updateFormData(getValues());
  }, [watchInstallBattery]);

  useEffect(() => {}, [batteryCapacity]);

  // ----------------- useHouseholdData useEffect -------------------
  React.useEffect(() => {}, [householdData]);

  // ----------------- Manage the number of vehicles -------------------

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vehicleObjs",
  });

  const numberOfVehicles = watch("numberOfVehicles");

  const isUpdatingVehicles = useRef(false);

  useEffect(() => {
    if (isUpdatingVehicles.current) return;

    const currentLength = fields.length;

    if (numberOfVehicles > currentLength) {
      for (let i = currentLength; i < numberOfVehicles; i++) {
        const newVehicle: VehicleObject = {
          id: i + 1, // as number,
          fuelType: VehicleFuelTypeEnum.Petrol, // 'PETROL'
          usageType: "Medium" as UsageType,
          switchToEV: true,
        };
        append(newVehicle);
      }
    }
  }, [numberOfVehicles, append, fields.length]);

  useEffect(() => {
    if (isUpdatingVehicles.current) return;

    const currentLength = fields.length;

    if (numberOfVehicles < currentLength) {
      for (let i = currentLength; i > numberOfVehicles; i--) {
        remove(i - 1);
      }
    }
  }, [numberOfVehicles, remove, fields.length]);

  const handleVehicleDelete = async (index: number) => {
    isUpdatingVehicles.current = true;
    await remove(index);

    const updatedNumberOfVehicles = numberOfVehicles - 1;
    setValue("numberOfVehicles", updatedNumberOfVehicles, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (updatedNumberOfVehicles === 0) {
      setValue("vehicleObjs", [], { shouldValidate: true, shouldDirty: true });
      setValue("numberOfVehicles", 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      const updatedFields = getValues("vehicleObjs");
      setValue("vehicleObjs", updatedFields, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    isUpdatingVehicles.current = false;
  };

  // -------------------------------------------------------------------
  // Function to update form data
  const updateFormData = (formValue: HouseholdFormState) => {
    // Update switchToEV based on fuelType
    formValue.vehicleObjs.forEach((vehicle, index) => {
      if (vehicle.fuelType === "ELECTRIC") {
        setValue(`vehicleObjs.${index}.switchToEV`, false);
      } else {
        setValue(`vehicleObjs.${index}.switchToEV`, vehicle.switchToEV);
      }
    });

    // Check whether user already has solar or battery
    const installSolar = formValue.solar.hasSolar
      ? false
      : formValue.solar.installSolar;
    const installBattery = formValue.battery?.hasBattery
      ? false
      : formValue.battery.installBattery;

    const householdDataOut: Household = {
      location: formValue.location ?? defaultFormState.location,
      occupancy: formValue.occupancy ?? defaultFormState.occupancy,
      spaceHeating: formValue.spaceHeating ?? defaultFormState.spaceHeating,
      waterHeating: formValue.waterHeating ?? defaultFormState.waterHeating,
      cooktop: formValue.cooktop ?? defaultFormState.cooktop,
      vehicles: (formValue.vehicleObjs ?? defaultFormState.vehicleObjs)
        .filter((vehicle): vehicle is VehicleObject => vehicle !== undefined)
        .map((vehicle: VehicleObject) => {
          const vehicleOut: Vehicle = {
            fuelType: vehicle.fuelType,
            kmsPerWeek:
              formText.options.vehicle.usageOptions.find(
                (option: UsageOption) => option.type === vehicle.usageType,
              )?.value ?? 200,
            switchToEV: vehicle.switchToEV,
          };
          return vehicleOut;
        }),
      solar: {
        hasSolar: Boolean(
          formValue.solar?.hasSolar ?? defaultFormState.solar.hasSolar,
        ),
        size: formValue.solar?.size ?? defaultFormState.solar.size,
        installSolar: installSolar,
      },
      battery: {
        hasBattery: Boolean(
          formValue.battery?.hasBattery ?? defaultFormState.battery.hasBattery,
        ),
        capacity:
          formValue.battery?.capacity ?? defaultFormState.battery.capacity,
        installBattery: installBattery,
      },
    };

    updateHouseholdData(householdDataOut);
  };

  // Watch for changes in the form
  const isUpdating = useRef(false);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (isUpdating.current) return;
      isUpdating.current = true;

      if (value) {
        updateFormData(value as HouseholdFormState);
      }

      isUpdating.current = false;
    });
    return () => subscription.unsubscribe();
  }, [watch, updateHouseholdData, setValue]);

  const handleReset = () => {
    methods.reset();
    setBatteryCapacity(defaultFormData.battery.capacity);
    setSolarSize(defaultFormData.solar.size);
  };

  const onSubmit = (formData: Household) => {};

  // ------------------------------------
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <ResetButton
            theme={theme}
            type="button"
            onClick={handleReset}
            sx={{
              width: "fit-content",
            }}
          >
            <img src={resetIcon} className="Home-logo" alt="logo" />
            <Typography variant="body1">Reset</Typography>
          </ResetButton>
        </Box>

        <FormContainer theme={theme} className="formContainer">
          <FormBox theme={theme} className="formBox">
            <FDivider />

            <Typography variant="h3">Your home</Typography>

            <FormSectionFlex
              theme={theme}
              className="FormSectionFlex"
              sx={{
                "& .MuiFormControl-root": {
                  width: "100%",
                  flex: "1 1 100%",
                  [theme.breakpoints.up("sm")]: {
                    flex: "1 1 calc(50% - 1rem)",
                    maxWidth: "calc(50% - 1rem)",
                  },
                },
              }}
            >
              <FormControl
                className="fullFormControl"
                error={!!methods.formState.errors.location}
              >
                <LabelBox>
                  <FormLabel className="mainLabels" htmlFor="location">
                    Location
                  </FormLabel>
                </LabelBox>
                <HouseSelect
                  IconComponent={chevronDown}
                  inputProps={{
                    id: "location",
                  }}
                  value={watchAllFields.location}
                  {...methods.register("location", { required: true })}
                >
                  {formText.options.location.map(
                    (option: Option<LocationEnum>) => (
                      <HouseMenuItem
                        theme={theme}
                        key={option.value}
                        value={option.value}
                        selected={watchAllFields.location === option.value}
                        onClick={() => setValue("location", option.value)}
                      >
                        {option.text}
                      </HouseMenuItem>
                    ),
                  )}
                </HouseSelect>
                {/* )}
          /> */}
                {methods.formState.errors.location && (
                  <FormHelperText>This field is required</FormHelperText>
                )}
              </FormControl>

              <FormControl
                className="fullFormControl"
                error={!!methods.formState.errors.occupancy}
              >
                <LabelBox>
                  <FormLabel className="mainLabels" htmlFor="occupancy">
                    Number of occupants
                  </FormLabel>
                </LabelBox>
                <HouseSelect
                  IconComponent={chevronDown}
                  inputProps={{
                    id: "occupancy",
                  }}
                  value={watchAllFields.occupancy}
                  {...methods.register("occupancy", { required: true })}
                >
                  {formText.options.occupancy.map((option: OptionNumber) => (
                    <HouseMenuItem
                      theme={theme}
                      key={option.value}
                      value={option.value}
                      selected={watchAllFields.occupancy === option.value}
                    >
                      {option.text}
                    </HouseMenuItem>
                  ))}
                </HouseSelect>
                {methods.formState.errors.occupancy && (
                  <FormHelperText>This field is required</FormHelperText>
                )}
              </FormControl>
            </FormSectionFlex>
          </FormBox>

          <FormBox theme={theme} className="formBox">
            <FDivider />

            <Typography variant="h3" sx={{ marginBottom: "0.9rem" }}>
              Current household appliances
            </Typography>
            <FormHelperText sx={{ marginBottom: 0 }}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "0.9rem",
                  height: "0.9rem",
                  backgroundColor: theme.palette.warning.light,
                  borderRadius: "2px",
                  border: "1px solid black",
                  marginRight: "0.5em",
                  verticalAlign: "text-top",
                }}
              ></Box>
              fossil fuel machine (high emissions)
            </FormHelperText>
            <FormHelperText sx={{ marginBottom: "1.5rem" }}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "0.9rem",
                  height: "0.9rem",
                  backgroundColor: theme.palette.success.light,
                  borderRadius: "2px",
                  border: "1px solid black",
                  marginRight: "0.5em",
                  verticalAlign: "text-top",
                }}
              ></Box>
              electric machine (low or zero emissions)
            </FormHelperText>

            <FormSectionFlex
              theme={theme}
              className="FormSectionFlex"
              sx={{
                "& .MuiFormControl-root": {
                  width: "100%",
                  flex: "1 1 100%",
                  [theme.breakpoints.up("sm")]: {
                    flex: "1 1 calc(33.33% - 1rem)",
                    maxWidth: "calc(33.33% - 1rem)",
                  },
                },
              }}
            >
              <FormControl
                className="fullFormControl"
                error={!!methods.formState.errors.spaceHeating}
              >
                <LabelBox>
                  <FormLabel
                    className="mainLabels"
                    htmlFor="spaceHeating-input"
                  >
                    House heating
                  </FormLabel>
                  <HouseholdTooltip
                    title={tooltipText.spaceHeating}
                    placement="top"
                  >
                    <img
                      src={questionIcon}
                      className="tooltip-logo"
                      alt="logo"
                    />
                  </HouseholdTooltip>
                </LabelBox>

                <HouseSelect
                  IconComponent={chevronDown}
                  labelId="spaceHeating-label"
                  id="spaceHeating"
                  inputProps={{
                    id: "spaceHeating-input",
                  }}
                  value={watchAllFields.spaceHeating}
                  {...methods.register("spaceHeating", { required: true })}
                  sx={{
                    "& #spaceHeating": {
                      backgroundColor:
                        watchAllFields.spaceHeating !==
                          SpaceHeatingEnum.ElectricHeatPump &&
                        watchAllFields.spaceHeating !==
                          SpaceHeatingEnum.ElectricResistance
                          ? theme.palette.warning.light
                          : theme.palette.success.light,
                    },
                  }}
                >
                  {formText.options.spaceHeating.map(
                    (option: Option<SpaceHeatingEnum>) => (
                      <HouseMenuItem
                        theme={theme}
                        key={option.value}
                        value={option.value}
                        selected={watchAllFields.spaceHeating === option.value}
                      >
                        {option.text}
                      </HouseMenuItem>
                    ),
                  )}
                </HouseSelect>
                {methods.formState.errors.spaceHeating && (
                  <FormHelperText>This field is required</FormHelperText>
                )}
                {watchAllFields.spaceHeating !==
                  SpaceHeatingEnum.ElectricHeatPump &&
                  watchAllFields.spaceHeating !==
                    SpaceHeatingEnum.ElectricResistance && (
                    <FormHelperText sx={{ marginLeft: 0, marginRight: 0 }}>
                      🔧 Replacing with electric heat pumps
                    </FormHelperText>
                  )}
                {watchAllFields.spaceHeating ===
                  SpaceHeatingEnum.ElectricHeatPump && (
                  <FormHelperText sx={{ marginLeft: 0, marginRight: 0 }}>
                    {electrificationStatusMapping.alreadyMostEfficient}
                  </FormHelperText>
                )}
                {watchAllFields.spaceHeating ===
                  SpaceHeatingEnum.ElectricResistance && (
                  <FormHelperText sx={{ marginLeft: 0, marginRight: 0 }}>
                    {electrificationStatusMapping.alreadyElectricButWillReplace}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                className="fullFormControl"
                error={!!methods.formState.errors.waterHeating}
              >
                <LabelBox>
                  <FormLabel
                    className="mainLabels"
                    htmlFor="waterHeating-input"
                  >
                    Water heating
                  </FormLabel>
                  <HouseholdTooltip
                    title={tooltipText.waterHeating}
                    placement="top"
                  >
                    <img
                      src={questionIcon}
                      className="tooltip-logo"
                      alt="logo"
                    />
                  </HouseholdTooltip>
                </LabelBox>

                <HouseSelect
                  IconComponent={chevronDown}
                  labelId="waterHeating-label"
                  id="waterHeating"
                  inputProps={{
                    id: "waterHeating-input",
                  }}
                  value={watchAllFields.waterHeating}
                  {...methods.register("waterHeating", { required: true })}
                  sx={{
                    "& #waterHeating": {
                      backgroundColor:
                        watchAllFields.waterHeating !==
                          WaterHeatingEnum.ElectricHeatPump &&
                        watchAllFields.waterHeating !==
                          WaterHeatingEnum.ElectricResistance
                          ? theme.palette.warning.light
                          : theme.palette.success.light,
                    },
                  }}
                >
                  {formText.options.waterHeating.map(
                    (option: Option<WaterHeatingEnum>) => (
                      <HouseMenuItem
                        theme={theme}
                        key={option.value}
                        value={option.value}
                        selected={watchAllFields.waterHeating === option.value}
                      >
                        {option.text}
                      </HouseMenuItem>
                    ),
                  )}
                </HouseSelect>
                {methods.formState.errors.waterHeating && (
                  <FormHelperText>This field is required</FormHelperText>
                )}
                {watchAllFields.waterHeating !==
                  WaterHeatingEnum.ElectricHeatPump &&
                  watchAllFields.waterHeating !==
                    WaterHeatingEnum.ElectricResistance &&
                  watchAllFields.waterHeating !== WaterHeatingEnum.Solar && (
                    <FormHelperText sx={{ marginLeft: 0, marginRight: 0 }}>
                      🔧 Replacing with electric water heat pump
                    </FormHelperText>
                  )}
                {watchAllFields.waterHeating ===
                  WaterHeatingEnum.ElectricHeatPump && (
                  <FormHelperText sx={{ marginLeft: 0, marginRight: 0 }}>
                    ⚡️ Already the most efficient option!
                  </FormHelperText>
                )}
                {watchAllFields.waterHeating ===
                  WaterHeatingEnum.ElectricResistance && (
                  <FormHelperText sx={{ marginLeft: 0, marginRight: 0 }}>
                    {electrificationStatusMapping.alreadyElectric}
                  </FormHelperText>
                )}
                {watchAllFields.waterHeating === WaterHeatingEnum.Solar && (
                  <FormHelperText sx={{ marginLeft: 0, marginRight: 0 }}>
                    🌱 Already zero emissions
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                className="fullFormControl"
                error={!!methods.formState.errors.cooktop}
              >
                <LabelBox>
                  <FormLabel className="mainLabels" htmlFor="cooktop-input">
                    Cooktop
                  </FormLabel>
                  <HouseholdTooltip title={tooltipText.cooktop} placement="top">
                    <img
                      src={questionIcon}
                      className="tooltip-logo"
                      alt="logo"
                    />
                  </HouseholdTooltip>
                </LabelBox>

                <HouseSelect
                  IconComponent={chevronDown}
                  labelId="cooktop-label"
                  id="cooktop"
                  inputProps={{
                    id: "cooktop-input",
                  }}
                  value={watchAllFields.cooktop}
                  {...methods.register("cooktop", { required: true })}
                  sx={{
                    "& #cooktop": {
                      backgroundColor:
                        watchAllFields.cooktop !==
                          CooktopEnum.ElectricInduction &&
                        watchAllFields.cooktop !==
                          CooktopEnum.ElectricResistance
                          ? theme.palette.warning.light
                          : theme.palette.success.light,
                    },
                  }}
                >
                  {formText.options.cooktop.map(
                    (option: Option<CooktopEnum>) => (
                      <HouseMenuItem
                        theme={theme}
                        key={option.value}
                        value={option.value}
                        selected={watchAllFields.cooktop === option.value}
                      >
                        {option.text}
                      </HouseMenuItem>
                    ),
                  )}
                </HouseSelect>
                {methods.formState.errors.cooktop && (
                  <FormHelperText>This field is required</FormHelperText>
                )}
                {watchAllFields.cooktop !== CooktopEnum.ElectricInduction &&
                  watchAllFields.cooktop !== CooktopEnum.ElectricResistance && (
                    <FormHelperText sx={{ marginLeft: 0, marginRight: 0 }}>
                      🔧 Replacing with electric induction
                    </FormHelperText>
                  )}
                {watchAllFields.cooktop === CooktopEnum.ElectricInduction && (
                  <FormHelperText sx={{ marginLeft: 0, marginRight: 0 }}>
                    {electrificationStatusMapping.alreadyMostEfficient}
                  </FormHelperText>
                )}
                {watchAllFields.cooktop === CooktopEnum.ElectricResistance && (
                  <FormHelperText sx={{ marginLeft: 0, marginRight: 0 }}>
                    {electrificationStatusMapping.alreadyElectric}
                  </FormHelperText>
                )}
              </FormControl>
            </FormSectionFlex>
          </FormBox>

          <FormSectionFlex
            theme={theme}
            className="FormSectionFlex"
            sx={{
              margin: 0,
            }}
          >
            <HalfWidthFormBox theme={theme} className="halfWidthFormBox">
              <FDivider />

              <Typography variant="h3">Solar panels</Typography>

              <FormSectionFlex theme={theme} className="FormSectionFlex">
                <LabelBox>
                  <FormLabel className="mainLabels" htmlFor="hasSolar-input-no">
                    Do you have solar panels?
                  </FormLabel>
                  <HouseholdTooltip
                    title={tooltipText.hasSolar}
                    placement="top"
                  >
                    <img
                      src={questionIcon}
                      className="tooltip-logo"
                      alt="logo"
                    />
                  </HouseholdTooltip>
                </LabelBox>
              </FormSectionFlex>

              <FormSectionFlex theme={theme} className="formSection">
                <FormControl
                  className="fullFormControl"
                  error={!!methods.formState.errors.solar}
                >
                  <Controller
                    name="solar.hasSolar"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        onChange={(e) => {
                          const value: boolean = e.target.value === "true";
                          field.onChange(value);
                        }}
                      >
                        {formText.options.solar.hasSolar.map(
                          (option: OptionYesNo) => (
                            <FormControlLabel
                              key={option.text}
                              value={option.value}
                              control={
                                <HouseRadio
                                  id={`hasSolar-input-${option.text.toLowerCase()}`}
                                />
                              }
                              label={option.text}
                            />
                          ),
                        )}
                      </RadioGroup>
                    )}
                  />
                  {methods.formState.errors.solar && (
                    <FormHelperText>This field is required</FormHelperText>
                  )}
                </FormControl>
              </FormSectionFlex>

              <FormSectionFlex theme={theme} className="FormSectionFlex">
                <FormControl
                  className="fullFormControl"
                  error={!!methods.formState.errors.solar?.installSolar}
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    // opacity: disableSolarToggle ? 0.5 : 1, // Grey out when disabled
                    // opacity: watchHasSolar ? 0.5 : 1, // Grey out when disabled
                  }}
                >
                  <SwitchLabel
                    className="installSolar-label"
                    htmlFor="installSolar-input"
                    theme={theme}
                  >
                    I'd like solar{" "}
                    {/* eslint-disable-line react/no-unescaped-entities */}
                  </SwitchLabel>
                  <Controller
                    name="solar.installSolar"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <HouseSwitch
                        {...field}
                        inputProps={{
                          id: "installSolar-input",
                        }}
                        checked={field.value}
                        disabled={watchHasSolar}
                        size="small"
                        theme={theme}
                      />
                    )}
                  />
                </FormControl>
              </FormSectionFlex>

              <FormSectionFlex
                theme={theme}
                className="FormSectionFlex-2"
                sx={{
                  margin: "1.5rem 0 0.4rem 0",
                }}
              >
                <FormControl
                  className="fullFormControl"
                  error={!!methods.formState.errors.solar?.size}
                >
                  <LabelBox>
                    <FormLabel className="mainLabels" htmlFor="solarSize-input">
                      What size of solar panel power output?
                    </FormLabel>
                    <HouseholdTooltip
                      title={tooltipText.solarSize}
                      placement="top"
                    >
                      <img
                        src={questionIcon}
                        className="tooltip-logo"
                        alt="logo"
                      />
                    </HouseholdTooltip>
                  </LabelBox>

                  <Controller
                    name="solar.size"
                    control={methods.control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={solarSize ?? ""}
                        onChange={(e) => {
                          const numericValue = parseFloat(e.target.value);
                          setSolarSize(isNaN(numericValue) ? 0 : numericValue);
                        }}
                        onBlur={(e) => {
                          const numericValue = parseFloat(e.target.value);
                          if (numericValue >= 0 && numericValue <= 1000) {
                            setSolarSize(
                              isNaN(numericValue) ? 0 : numericValue,
                            );
                          } else if (numericValue > 1000) {
                            setSolarSize(1000);
                          } else {
                            setSolarSize(0);
                          }
                          if (e.target.value === "") {
                            onChange(0);
                          }
                          setValue("solar.size", solarSize, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                        onKeyDown={(e) => {
                          const currentSize = solarSize || 0;
                          if (e.key === "Enter") {
                            if (currentSize >= 0 && currentSize <= 1000) {
                              setSolarSize(
                                isNaN(currentSize) ? 0 : currentSize,
                              );
                            } else if (currentSize > 1000) {
                              setSolarSize(1000);
                            } else {
                              setSolarSize(0);
                            }
                            setValue("solar.size", solarSize, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                          }
                          if (e.key === "ArrowUp") {
                            const newValue = Math.min(currentSize + 1, 1000);
                            setSolarSize(newValue);
                          }
                          if (e.key === "ArrowDown") {
                            const newValue = Math.max(currentSize - 1, 0);
                            setSolarSize(newValue);
                          }
                        }}
                        inputRef={ref}
                        InputProps={{
                          endAdornment: (
                            <HouseInputAdornment position="end">
                              {formText.defaultFormState.solar.unit}
                            </HouseInputAdornment>
                          ),
                          inputProps: {
                            style: { textAlign: "right" },
                            min: 0,
                            max: 1000,
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            id: "solarSize-input",
                          },
                        }}
                        error={!!methods.formState.errors.solar?.size}
                        helperText={
                          methods.formState.errors.solar?.size?.message
                        }
                      />
                    )}
                  />
                  {methods.formState.errors.solar?.size && (
                    <FormHelperText>This field is required</FormHelperText>
                  )}
                </FormControl>
              </FormSectionFlex>
            </HalfWidthFormBox>

            <HalfWidthFormBox theme={theme} className="halfWidthFormBox">
              <FDivider />

              <Typography variant="h3">Battery</Typography>

              <FormSectionFlex theme={theme} className="FormSectionFlex">
                <LabelBox>
                  <FormLabel
                    className="mainLabels"
                    htmlFor="hasBattery-input-no"
                    sx={{
                      opacity: disableBatteryFields ? 0.5 : 1, // Grey out when disabled
                    }}
                  >
                    Do you have a battery?
                  </FormLabel>
                  <HouseholdTooltip
                    title={tooltipText.hasBattery}
                    placement="top"
                  >
                    <img
                      src={questionIcon}
                      className="tooltip-logo"
                      alt="logo"
                    />
                  </HouseholdTooltip>
                </LabelBox>
              </FormSectionFlex>

              <FormSectionFlex theme={theme} className="FormSectionFlex">
                <Box>
                  <FormControl
                    className="fullFormControl"
                    error={!!methods.formState.errors.battery?.hasBattery}
                    disabled={disableBatteryFields}
                    sx={{
                      opacity: disableBatteryFields ? 0.5 : 1, // Grey out when disabled
                    }}
                  >
                    <Controller
                      name="battery.hasBattery"
                      control={methods.control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          onChange={(e) => {
                            const value: boolean = e.target.value === "true";
                            field.onChange(value);
                          }}
                        >
                          {formText.options.battery.hasBattery.map(
                            (option: OptionYesNo) => (
                              <FormControlLabel
                                key={option.text}
                                value={option.value}
                                control={
                                  <HouseRadio
                                    id={`hasBattery-input-${option.text.toLowerCase()}`}
                                  />
                                }
                                label={option.text}
                              />
                            ),
                          )}
                        </RadioGroup>
                      )}
                    />
                    {methods.formState.errors.battery?.hasBattery && (
                      <FormHelperText>This field is required</FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </FormSectionFlex>

              <FormSectionFlex theme={theme} className="FormSectionFlex">
                <FormControl
                  className="fullFormControl"
                  error={!!methods.formState.errors.battery?.installBattery}
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    opacity: disableBatteryFields ? 0.5 : 1, // Grey out when disabled
                  }}
                >
                  <SwitchLabel
                    className="installBattery-label"
                    htmlFor="installBattery-input"
                    theme={theme}
                  >
                    I'd like a battery{" "}
                    {/* eslint-disable-line react/no-unescaped-entities */}
                  </SwitchLabel>
                  <Controller
                    name="battery.installBattery"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <HouseSwitch
                        {...field}
                        checked={field.value}
                        disabled={watchHasBattery || disableBatteryFields}
                        // defaultChecked
                        size="small"
                        theme={theme}
                        inputProps={{
                          id: "installBattery-input",
                        }}
                      />
                    )}
                  />
                  {methods.formState.errors.battery?.installBattery && (
                    <FormHelperText>This field is required</FormHelperText>
                  )}
                </FormControl>
              </FormSectionFlex>

              <FormSectionFlex
                theme={theme}
                className="FormSectionFlex-2"
                sx={{
                  margin: "1.5rem 0 0.4rem 0",
                }}
              >
                <FormControl
                  className="fullFormControl"
                  error={!!methods.formState.errors.battery?.capacity}
                  disabled={disableBatteryFields}
                  sx={{
                    opacity: disableBatteryFields ? 0.5 : 1, // Grey out when disabled
                  }}
                >
                  <LabelBox>
                    <FormLabel
                      className="mainLabels"
                      htmlFor="batteryCapacity-input"
                    >
                      What battery capacity?
                    </FormLabel>
                    <HouseholdTooltip
                      title={tooltipText.batteryCapacity}
                      placement="top"
                    >
                      <img
                        src={questionIcon}
                        className="tooltip-logo"
                        alt="logo"
                      />
                    </HouseholdTooltip>
                  </LabelBox>

                  <Controller
                    name="battery.capacity"
                    control={methods.control}
                    render={({ field: { onChange, ref } }) => (
                      <TextField
                        value={batteryCapacity ?? ""}
                        onChange={(e) => {
                          const numericValue = parseFloat(e.target.value);
                          setBatteryCapacity(
                            isNaN(numericValue) ? 0 : numericValue,
                          );
                        }}
                        onBlur={(e) => {
                          const numericValue = parseFloat(e.target.value);
                          if (numericValue >= 0 && numericValue <= 1000) {
                            setBatteryCapacity(
                              isNaN(numericValue) ? 0 : numericValue,
                            );
                          } else if (numericValue > 1000) {
                            setBatteryCapacity(1000);
                          } else {
                            setBatteryCapacity(0);
                          }
                          if (e.target.value === "") {
                            onChange(0);
                          } else {
                            onChange(numericValue);
                          }
                          setValue("battery.capacity", batteryCapacity, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                        onKeyDown={(e) => {
                          // const currentCapacity = parseFloat(batteryCapacity as string) || 0;
                          const currentCapacity = batteryCapacity || 0;
                          if (e.key === "Enter") {
                            if (
                              currentCapacity >= 0 &&
                              currentCapacity <= 1000
                            ) {
                              setBatteryCapacity(
                                isNaN(currentCapacity) ? 0 : currentCapacity,
                              );
                            } else if (currentCapacity > 1000) {
                              setBatteryCapacity(1000);
                            } else {
                              setBatteryCapacity(0);
                            }
                            setValue("battery.capacity", batteryCapacity, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                          }
                          if (e.key === "ArrowUp") {
                            const newValue = Math.min(
                              currentCapacity + 1,
                              1000,
                            );
                            setBatteryCapacity(newValue);
                          }
                          if (e.key === "ArrowDown") {
                            const newValue = Math.max(currentCapacity - 1, 0);
                            setBatteryCapacity(newValue);
                          }
                        }}
                        inputRef={ref}
                        InputProps={{
                          endAdornment: (
                            <HouseInputAdornment position="end">
                              {formText.defaultFormState.battery.unit}
                            </HouseInputAdornment>
                          ),
                          inputProps: {
                            style: { textAlign: "right" },
                            min: 0,
                            max: 1000,
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            id: "batteryCapacity-input",
                          },
                        }}
                        error={!!methods.formState.errors.battery?.capacity}
                        disabled={disableBatteryFields}
                        helperText={
                          methods.formState.errors.battery?.capacity?.message
                        }
                      />
                    )}
                  />
                  {methods.formState.errors.battery?.capacity && (
                    <FormHelperText>
                      This field is required:{" "}
                      {methods.formState.errors.battery.capacity.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </FormSectionFlex>
            </HalfWidthFormBox>
          </FormSectionFlex>

          {/* Transport section */}

          <FormBox theme={theme} className="formBox">
            <FDivider />
            <HalfWidthFormBox theme={theme} className="halfWidthFormBox">
              <Typography variant="h3">Transport</Typography>

              <FormSectionFlex theme={theme} className="FormSectionFlex">
                <FormControl
                  className="fullFormControl"
                  error={!!methods.formState.errors.vehicleObjs}
                >
                  <LabelBox>
                    <FormLabel
                      className="mainLabels"
                      htmlFor="numberOfVehicles-input"
                    >
                      Number of vehicles
                    </FormLabel>
                    <HouseholdTooltip
                      title={tooltipText.vehicleNumber}
                      placement="top"
                    >
                      <img
                        src={questionIcon}
                        className="tooltip-logo"
                        alt="logo"
                      />
                    </HouseholdTooltip>
                  </LabelBox>
                  <Controller
                    name="numberOfVehicles"
                    control={methods.control}
                    render={({ field }) => (
                      <HouseSelect
                        IconComponent={chevronDown}
                        labelId="number-of-vehicles-label"
                        {...field}
                        value={numberOfVehicles}
                        inputProps={{ id: "numberOfVehicles-input" }}
                      >
                        {formText.options.vehicle.amount.map(
                          (option: OptionNumber) => (
                            <HouseMenuItem
                              theme={theme}
                              key={option.value}
                              value={option.value}
                              selected={numberOfVehicles === option.value}
                            >
                              {option.text}
                            </HouseMenuItem>
                          ),
                        )}
                      </HouseSelect>
                    )}
                  />
                  {methods.formState.errors.vehicleObjs && (
                    <FormHelperText>This field is required</FormHelperText>
                  )}
                </FormControl>
              </FormSectionFlex>
            </HalfWidthFormBox>

            <FormSectionGrid
              theme={theme}
              className="FormSectionGrid"
              sx={{
                margin: "1.8rem 0",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                [theme.breakpoints.up("sm")]: {
                  gridTemplateColumns: "repeat(2, 1fr)",
                },
                gridGap: "2rem",
                alignItems: "start",
                gridAutoRows: "max-content",
              }}
            >
              {watchAllFields.vehicleObjs?.map(
                (vehicle: VehicleObject, index: number) => (
                  <VehicleBox
                    key={`vehicle-id-${index}`}
                    index={index}
                    defaultChecked={true}
                    {...vehicle}
                    onDelete={() => handleVehicleDelete(index)}
                    fuelTypeOptions={formText.options.vehicle.fuelTypeOptions}
                    usageOptions={formText.options.vehicle.usageOptions}
                    defaultType={"Medium"}
                  />
                ),
              )}
            </FormSectionGrid>
          </FormBox>
        </FormContainer>
      </form>
    </FormProvider>
  );
};

export default HouseholdForm;
