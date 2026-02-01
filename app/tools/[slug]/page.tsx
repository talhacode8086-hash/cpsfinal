import { notFound } from 'next/navigation';
import { getToolBySlug, tools, slugifyCategory } from '@/lib/tools-config';
import { Metadata } from 'next';
import ToolPageClient from '@/components/tools/ToolPageClient';

// Import all components for the map
import SensitivityConverter from '@/components/tools/gaming/SensitivityConverter';
import WordCounter from '@/components/tools/productivity/WordCounter';
import PasswordGenerator from '@/components/tools/productivity/PasswordGenerator';
import JSONFormatter from '@/components/tools/developer/JSONFormatter';
import EDPICalculator from '@/components/tools/gaming/EDPICalculator';
import CPSTest from '@/components/tools/gaming/CPSTest';
import KeyboardLatency from '@/components/tools/gaming/KeyboardLatency';
import AimTrainer from '@/components/tools/gaming/AimTrainer';
import PollingRateChecker from '@/components/tools/gaming/PollingRateChecker';
import CM360Calculator from '@/components/tools/gaming/CM360Calculator';
import FPSCalculator from '@/components/tools/gaming/FPSCalculator';
import ReactionTest from '@/components/tools/gaming/ReactionTest';
import DoubleClickTest from '@/components/tools/gaming/DoubleClickTest';
import NKROTester from '@/components/tools/gaming/NKROTester';
import MouseAcceleration from '@/components/tools/gaming/MouseAcceleration';
import SensitivityRandomizer from '@/components/tools/gaming/SensitivityRandomizer';
import AimConsistency from '@/components/tools/gaming/AimConsistency';
import ScrollTest from '@/components/tools/gaming/ScrollTest';
import CrosshairGenerator from '@/components/tools/gaming/CrosshairGenerator';
import SensitivityMatch from '@/components/tools/gaming/SensitivityMatch';
import InputLagEstimator from '@/components/tools/gaming/InputLagEstimator';
import MotionBlurTest from '@/components/tools/gaming/MotionBlurTest';
import EsportsWarmup from '@/components/tools/gaming/EsportsWarmup';
import JitterClick from '@/components/tools/gaming/JitterClick';
import KohiClick from '@/components/tools/gaming/KohiClick';
import SpacebarCounter from '@/components/tools/gaming/SpacebarCounter';
import ButterflyClick from '@/components/tools/gaming/ButterflyClick';
import MovementTracker from '@/components/tools/gaming/MovementTracker';
import DragClickTest from '@/components/tools/gaming/DragClickTest';
import MouseDurability from '@/components/tools/gaming/MouseDurability';
import LeftRightClick from '@/components/tools/gaming/LeftRightClick';
import AccuracyTrainer from '@/components/tools/gaming/AccuracyTrainer';
import FlickTrainer from '@/components/tools/gaming/FlickTrainer';
import TrackingTrainer from '@/components/tools/gaming/TrackingTrainer';
import CircleClick from '@/components/tools/gaming/CircleClick';
import TrailVisualizer from '@/components/tools/gaming/TrailVisualizer';
import DPIAnalyzer from '@/components/tools/gaming/DPIAnalyzer';
import TypingSpeedTest from '@/components/tools/gaming/TypingSpeedTest';
import KeyGhostingTest from '@/components/tools/gaming/KeyGhostingTest';
import KeyRolloverTest from '@/components/tools/gaming/KeyRolloverTest';
import KeyboardHeatmap from '@/components/tools/gaming/KeyboardHeatmap';
import SwitchSoundTest from '@/components/tools/gaming/SwitchSoundTest';
import ActuatorForceTest from '@/components/tools/gaming/ActuatorForceTest';
import KeyWobbleTest from '@/components/tools/gaming/KeyWobbleTest';
import MacroDelayTester from '@/components/tools/gaming/MacroDelayTester';
import CrosshairOverlay from '@/components/tools/gaming/CrosshairOverlay';
import RecoilTrainer from '@/components/tools/gaming/RecoilTrainer';
import GrenadeCalculator from '@/components/tools/gaming/GrenadeCalculator';
import PeekersAdvantage from '@/components/tools/gaming/PeekersAdvantage';
import SoundDirectionTest from '@/components/tools/gaming/SoundDirectionTest';
import MetaTagGenerator from '@/components/tools/seo/MetaTagGenerator';
import RobotsGenerator from '@/components/tools/seo/RobotsGenerator';
import LengthConverter from '@/components/tools/productivity/LengthConverter';
import WeightConverter from '@/components/tools/productivity/WeightConverter';
import CaseConverter from '@/components/tools/productivity/CaseConverter';
import FindReplace from '@/components/tools/productivity/FindReplace';
import ReverseText from '@/components/tools/productivity/ReverseText';
import WhitespaceRemover from '@/components/tools/productivity/WhitespaceRemover';
import TextBinaryConverter from '@/components/tools/productivity/TextBinaryConverter';
import RandomStringGen from '@/components/tools/productivity/RandomStringGen';
import TextToSlug from '@/components/tools/productivity/TextToSlug';
import MorseCodeTranslator from '@/components/tools/productivity/MorseCodeTranslator';
import ZalgoText from '@/components/tools/productivity/ZalgoText';
import UpsideDownText from '@/components/tools/productivity/UpsideDownText';
import SmallTextGenerator from '@/components/tools/productivity/SmallTextGenerator';
import HTMLEntityConverter from '@/components/tools/productivity/HTMLEntityConverter';
import TextToHex from '@/components/tools/productivity/TextToHex';
import StripHTML from '@/components/tools/productivity/StripHTML';
import MarkdownToText from '@/components/tools/productivity/MarkdownToText';
import LineAlphabetizer from '@/components/tools/productivity/LineAlphabetizer';
import WordFrequency from '@/components/tools/productivity/WordFrequency';
import PrefixSuffixAdder from '@/components/tools/productivity/PrefixSuffixAdder';
import LineNumberer from '@/components/tools/productivity/LineNumberer';
import DuplicateLineFinder from '@/components/tools/productivity/DuplicateLineFinder';
import ROT13Cipher from '@/components/tools/productivity/ROT13Cipher';
import EmojiRemover from '@/components/tools/productivity/EmojiRemover';
import TextToHandwriting from '@/components/tools/productivity/TextToHandwriting';
import SentenceCounterPro from '@/components/tools/productivity/SentenceCounterPro';
import TextMirrorTool from '@/components/tools/productivity/TextMirrorTool';
import ListToCSV from '@/components/tools/productivity/ListToCSV';
import QRCodeGenerator from '@/components/tools/productivity/QRCodeGenerator';
import Base64Tool from '@/components/tools/productivity/Base64Tool';
import MarkdownPreviewer from '@/components/tools/productivity/MarkdownPreviewer';
import LoremIpsumGenerator from '@/components/tools/productivity/LoremIpsumGenerator';
import TextDiffChecker from '@/components/tools/productivity/TextDiffChecker';
import RemoveDuplicateLines from '@/components/tools/productivity/RemoveDuplicateLines';
import GSTCalculator from '@/components/tools/productivity/GSTCalculator';
import EMICalculator from '@/components/tools/productivity/EMICalculator';
import AgeCalculator from '@/components/tools/productivity/AgeCalculator';
import TipCalculator from '@/components/tools/productivity/TipCalculator';
import DiscountCalculator from '@/components/tools/productivity/DiscountCalculator';
import PercentageCalculator from '@/components/tools/productivity/PercentageCalculator';
import PomodoroTimer from '@/components/tools/productivity/PomodoroTimer';
import TimeZoneConverter from '@/components/tools/productivity/TimeZoneConverter';
import Stopwatch from '@/components/tools/productivity/Stopwatch';
import GradientGenerator from '@/components/tools/productivity/GradientGenerator';
import AspectRatioCalculator from '@/components/tools/productivity/AspectRatioCalculator';
import ImagePlaceholder from '@/components/tools/productivity/ImagePlaceholder';
import URLEncoder from '@/components/tools/developer/URLEncoder';
import HTMLMinifier from '@/components/tools/developer/HTMLMinifier';
import RegexTester from '@/components/tools/developer/RegexTester';
import SitemapGenerator from '@/components/tools/seo/SitemapGenerator';
import SchemaMarkupMaker from '@/components/tools/seo/SchemaMarkupMaker';
import OGPreview from '@/components/tools/seo/OGPreview';
import ColorContrast from '@/components/tools/design/ColorContrast';
import GlassmorphismGen from '@/components/tools/design/GlassmorphismGen';
import SVGToDataURI from '@/components/tools/design/SVGToDataURI';
import CompoundInterest from '@/components/tools/finance/CompoundInterest';
import SalaryTaxCalc from '@/components/tools/finance/SalaryTaxCalc';
import ImageResizer from '@/components/tools/image/ImageResizer';
import ImageConverter from '@/components/tools/image/ImageConverter';
import ImageCompressor from '@/components/tools/image/ImageCompressor';
import ImageCropper from '@/components/tools/image/ImageCropper';
import CSVJSONConverter from '@/components/tools/developer/CSVJSONConverter';
import XMLJSONConverter from '@/components/tools/developer/XMLJSONConverter';
import FOVCalculator from '@/components/tools/gaming/FOVCalculator';
import ResolutionScaler from '@/components/tools/gaming/ResolutionScaler';
import GamingDeskHeight from '@/components/tools/gaming/GamingDeskHeight';
import PingJitterAnalyzer from '@/components/tools/gaming/PingJitterAnalyzer';
import MonitorPPICalculator from '@/components/tools/gaming/MonitorPPICalculator';
import MonitorDistanceMatcher from '@/components/tools/gaming/MonitorDistanceMatcher';
import SoundReactionTest from '@/components/tools/gaming/SoundReactionTest';
import PeripheralVisionTrainer from '@/components/tools/gaming/PeripheralVisionTrainer';
import TargetTrackingPro from '@/components/tools/gaming/TargetTrackingPro';
import MicroFlickDrills from '@/components/tools/gaming/MicroFlickDrills';
import BurstTimingTrainer from '@/components/tools/gaming/BurstTimingTrainer';
import SpatialMemoryBench from '@/components/tools/gaming/SpatialMemoryBench';
import ClickTimingTrainer from '@/components/tools/gaming/ClickTimingTrainer';
import GridShotMini from '@/components/tools/gaming/GridShotMini';
import PressureReflexTest from '@/components/tools/gaming/PressureReflexTest';
import ReflexPatternMatch from '@/components/tools/gaming/ReflexPatternMatch';
import StrafeAimingSim from '@/components/tools/gaming/StrafeAimingSim';

import MouseGlideTest from '@/components/tools/gaming/MouseGlideTest';
import LODTestGuide from '@/components/tools/gaming/LODTestGuide';
import RightClickSpeedTest from '@/components/tools/gaming/RightClickSpeedTest';
import ScrollSpeedTester from '@/components/tools/gaming/ScrollSpeedTester';
import MouseSensorJitterTest from '@/components/tools/gaming/MouseSensorJitterTest';
import MousePixelSkippingCheck from '@/components/tools/gaming/MousePixelSkippingCheck';
import CursorPrecisionBench from '@/components/tools/gaming/CursorPrecisionBench';
import MouseLatencyTester from '@/components/tools/gaming/MouseLatencyTester';
import KeyRepeatRateTest from '@/components/tools/gaming/KeyRepeatRateTest';
import KeyboardDebounceTester from '@/components/tools/gaming/KeyboardDebounceTester';
import BlindTypingChallenge from '@/components/tools/gaming/BlindTypingChallenge';
import CodeTypingSpeed from '@/components/tools/gaming/CodeTypingSpeed';
import KeyboardPollingRateCheck from '@/components/tools/gaming/KeyboardPollingRateCheck';
import NKRORolloverPro from '@/components/tools/gaming/NKRORolloverPro';
import KeyboardAudioLatency from '@/components/tools/gaming/KeyboardAudioLatency';
import FullKeyboardHealthCheck from '@/components/tools/gaming/FullKeyboardHealthCheck';
import NumpadSpeedTest from '@/components/tools/gaming/NumpadSpeedTest';

import JWTDecoderPro from '@/components/tools/developer/JWTDecoderPro';
import HTTPStatusLookup from '@/components/tools/developer/HTTPStatusLookup';
import YAMLJSONConverter from '@/components/tools/developer/YAMLJSONConverter';
import CronExpressionGen from '@/components/tools/developer/CronExpressionGen';
import SQLFormatterPro from '@/components/tools/developer/SQLFormatterPro';
import JSMinifierTiny from '@/components/tools/developer/JSMinifierTiny';
import BashScriptValidator from '@/components/tools/developer/BashScriptValidator';

import KeywordDensityChecker from '@/components/tools/seo/KeywordDensityChecker';
import HeadingHierarchyAnalyzer from '@/components/tools/seo/HeadingHierarchyAnalyzer';
import GoogleSERPPreview from '@/components/tools/seo/GoogleSERPPreview';
import TwitterCardPreview from '@/components/tools/seo/TwitterCardPreview';
import OpenGraphInspector from '@/components/tools/seo/OpenGraphInspector';
import BacklinkAnchorGen from '@/components/tools/seo/BacklinkAnchorGen';
import CanonicalURLChecker from '@/components/tools/seo/CanonicalURLChecker';
import ALTTextAccessibility from '@/components/tools/seo/ALTTextAccessibility';
import PageLoadSimulator from '@/components/tools/seo/PageLoadSimulator';
import FaviconGeneratorPro from '@/components/tools/seo/FaviconGeneratorPro';
import DomainHistoryLookup from '@/components/tools/seo/DomainHistoryLookup';
import NicheKeywordResearch from '@/components/tools/seo/NicheKeywordResearch';
import InternalLinkStrategist from '@/components/tools/seo/InternalLinkStrategist';
import StructuredDataBench from '@/components/tools/seo/StructuredDataBench';
import AdSenseRevenueCalc from '@/components/tools/seo/AdSenseRevenueCalc';
import RobotsTxtValidator from '@/components/tools/seo/RobotsTxtValidator';

// Unit Converters
import TemperatureConverter from '@/components/tools/converters/TemperatureConverter';
import SpeedConverter from '@/components/tools/converters/SpeedConverter';
import VolumeConverter from '@/components/tools/converters/VolumeConverter';
import AreaConverter from '@/components/tools/converters/AreaConverter';
import PressureConverter from '@/components/tools/converters/PressureConverter';
import EnergyConverter from '@/components/tools/converters/EnergyConverter';
import PowerConverter from '@/components/tools/converters/PowerConverter';
import AngleConverter from '@/components/tools/converters/AngleConverter';
import FuelEconomyConverter from '@/components/tools/converters/FuelEconomyConverter';
import TorqueConverter from '@/components/tools/converters/TorqueConverter';
import ForceConverter from '@/components/tools/converters/ForceConverter';
import NumberBaseConverter from '@/components/tools/converters/NumberBaseConverter';
import RomanNumeralConverter from '@/components/tools/converters/RomanNumeralConverter';
import DataRateConverter from '@/components/tools/converters/DataRateConverter';
import DigitalStoragePro from '@/components/tools/converters/DigitalStoragePro';
import CookingUnitConverter from '@/components/tools/converters/CookingUnitConverter';
import FrequencyConverter from '@/components/tools/converters/FrequencyConverter';

// Finance Tools
import MortgageCalculator from '@/components/tools/finance/MortgageCalculator';
import InvestmentROICalc from '@/components/tools/finance/InvestmentROICalc';
import RetirementPlanner from '@/components/tools/finance/RetirementPlanner';
import SavingsGoalCalc from '@/components/tools/finance/SavingsGoalCalc';
import CryptoPriceConverter from '@/components/tools/finance/CryptoPriceConverter';
import InflationCalculator from '@/components/tools/finance/InflationCalculator';
import UnitPriceCalc from '@/components/tools/finance/UnitPriceCalc';
import BreakEvenCalc from '@/components/tools/finance/BreakEvenCalc';
import MarginMarkupCalc from '@/components/tools/finance/MarginMarkupCalc';
import CreditCardPayoff from '@/components/tools/finance/CreditCardPayoff';
import NetWorthCalc from '@/components/tools/finance/NetWorthCalc';
import DividendReinvestmentCalc from '@/components/tools/finance/DividendReinvestmentCalc';

import AlarmClock from '@/components/tools/daily/AlarmClock';
import WorldClock from '@/components/tools/daily/WorldClock';
import DailyPlanner from '@/components/tools/daily/DailyPlanner';
import BMICalculator from '@/components/tools/daily/BMICalculator';
import CalorieCalculator from '@/components/tools/daily/CalorieCalculator';
import WaterTracker from '@/components/tools/daily/WaterTracker';
import MeditationTimer from '@/components/tools/daily/MeditationTimer';
import Metronome from '@/components/tools/daily/Metronome';
import VirtualRuler from '@/components/tools/daily/VirtualRuler';
import DiceRoller from '@/components/tools/daily/DiceRoller';
import RandomNumberGen from '@/components/tools/daily/RandomNumberGen';
import CoinFlipper from '@/components/tools/daily/CoinFlipper';
import AnagramSolver from '@/components/tools/daily/AnagramSolver';
import ScrabbleScore from '@/components/tools/daily/ScrabbleScore';
import QuoteGenerator from '@/components/tools/daily/QuoteGenerator';
import WheelOfFortune from '@/components/tools/daily/WheelOfFortune';
import PasswordStrengthTester from '@/components/tools/daily/PasswordStrengthTester';

import BoxShadowGen from '@/components/tools/design/BoxShadowGen';
import BorderRadiusGen from '@/components/tools/design/BorderRadiusGen';
import FlexboxPlayground from '@/components/tools/design/FlexboxPlayground';
import GridLayoutHelper from '@/components/tools/design/GridLayoutHelper';
import PixelToRem from '@/components/tools/design/PixelToRem';
import TypographicScaleGen from '@/components/tools/design/TypographicScaleGen';
import GoldenRatioCalc from '@/components/tools/design/GoldenRatioCalc';
import ColorBlindSim from '@/components/tools/design/ColorBlindSim';
import MeshGradientGen from '@/components/tools/design/MeshGradientGen';
import NeuomorphismGen from '@/components/tools/design/NeuomorphismGen';
import TailwindColorPicker from '@/components/tools/design/TailwindColorPicker';
import SVGPathEditor from '@/components/tools/design/SVGPathEditor';
import CustomButtonGenerator from '@/components/tools/design/CustomButtonGenerator';
import GlassmorphismPro from '@/components/tools/design/GlassmorphismPro';
import ColorPaletteGenerator from '@/components/tools/design/ColorPaletteGenerator';
import ColorShadesGenerator from '@/components/tools/design/ColorShadesGenerator';
import ColorHarmonyTool from '@/components/tools/design/ColorHarmonyTool';
import ContrastCheckerPro from '@/components/tools/design/ContrastCheckerPro';
import MaterialDesignPalette from '@/components/tools/design/MaterialDesignPalette';
import FlatUIColors from '@/components/tools/design/FlatUIColors';
import CSSFilterGenerator from '@/components/tools/design/CSSFilterGenerator';
import CSSTextShadowGen from '@/components/tools/design/CSSTextShadowGen';
import CSSClipPathGen from '@/components/tools/design/CSSClipPathGen';
import CSSAnimationGen from '@/components/tools/design/CSSAnimationGen';
import CSSScrollbarCustomizer from '@/components/tools/design/CSSScrollbarCustomizer';
import CSSLoaderGenerator from '@/components/tools/design/CSSLoaderGenerator';
import CSSTooltipGenerator from '@/components/tools/design/CSSTooltipGenerator';
import CSSRibbonGenerator from '@/components/tools/design/CSSRibbonGenerator';
import CSSInputStylizer from '@/components/tools/design/CSSInputStylizer';
import CSSCheckboxStylizer from '@/components/tools/design/CSSCheckboxStylizer';
import SVGPatternGenerator from '@/components/tools/design/SVGPatternGenerator';
import ComponentMockupGen from '@/components/tools/design/ComponentMockupGen';
import NeumorphismGen from '@/components/tools/design/NeumorphismGen';
import CardLayoutVisualizer from '@/components/tools/design/CardLayoutVisualizer';
import CSSButtonsPack from '@/components/tools/design/CSSButtonsPack';

import ImageFilters from '@/components/tools/image/ImageFilters';
import EXIFViewer from '@/components/tools/image/EXIFViewer';

// Education Tools
import GPACalculator from '@/components/tools/education/GPACalculator';
import ScientificCalculator from '@/components/tools/education/ScientificCalculator';
import CitationGenerator from '@/components/tools/education/CitationGenerator';
import PeriodicTablePro from '@/components/tools/education/PeriodicTablePro';
import MathStepSolver from '@/components/tools/education/MathStepSolver';
import FlashcardMaker from '@/components/tools/education/FlashcardMaker';
import WeightedGradeCalc from '@/components/tools/education/WeightedGradeCalc';
import FinalGradeRequired from '@/components/tools/education/FinalGradeRequired';
import EssayOutlineGen from '@/components/tools/education/EssayOutlineGen';
import PercentageGPASolver from '@/components/tools/education/PercentageGPASolver';
import PhysicsFormulaSolver from '@/components/tools/education/PhysicsFormulaSolver';
import ChemEquationBalancer from '@/components/tools/education/ChemEquationBalancer';
import StudyPlannerPro from '@/components/tools/education/StudyPlannerPro';
import BibliographyAutomator from '@/components/tools/education/BibliographyAutomator';
import VocabularyBuilder from '@/components/tools/education/VocabularyBuilder';
import GraphingToolLite from '@/components/tools/education/GraphingToolLite';
import VennDiagramMaker from '@/components/tools/education/VennDiagramMaker';
import PrimeNumberAnalyzer from '@/components/tools/education/PrimeNumberAnalyzer';
import MatrixCalculator from '@/components/tools/education/MatrixCalculator';
import UnitCircleInteractive from '@/components/tools/education/UnitCircleInteractive';
import DerivativeIntegralRules from '@/components/tools/education/DerivativeIntegralRules';
import AssignmentTracker from '@/components/tools/education/AssignmentTracker';
import SATACTConverter from '@/components/tools/education/SATACTConverter';
import MindMapLite from '@/components/tools/education/MindMapLite';

// Advanced Scholar Suite
import ProjectileSimulator from '@/components/tools/education/ProjectileSimulator';
import CircuitSolverPro from '@/components/tools/education/CircuitSolverPro';
import ComplexNumberPro from '@/components/tools/education/ComplexNumberPro';
import ProbabilityPro from '@/components/tools/education/ProbabilityPro';
import PHCalculatorPro from '@/components/tools/education/PHCalculatorPro';
import GasLawAdvanced from '@/components/tools/education/GasLawAdvanced';
import DifferentialEqPro from '@/components/tools/education/DifferentialEqPro';
import RelativityDilation from '@/components/tools/education/RelativityDilation';
import ReactionKineticsPro from '@/components/tools/education/ReactionKineticsPro';
import LaplaceSolverPro from '@/components/tools/education/LaplaceSolverPro';
import VectorCalcPro from '@/components/tools/education/VectorCalcPro';
import TitrationCurveSim from '@/components/tools/education/TitrationCurveSim';
import SVGToPNG from '@/components/tools/image/SVGToPNG';
import WebPConverter from '@/components/tools/image/WebPConverter';
import ImageToBase64 from '@/components/tools/image/ImageToBase64';
import Base64ToImage from '@/components/tools/image/Base64ToImage';
import ColorPickerImg from '@/components/tools/image/ColorPickerImg';
import FaviconGen from '@/components/tools/image/FaviconGen';
import GIFToFrames from '@/components/tools/image/GIFToFrames';
import SpriteSheetGen from '@/components/tools/image/SpriteSheetGen';
import QRCodeScanner from '@/components/tools/image/QRCodeScanner';
import BarcodeGenerator from '@/components/tools/image/BarcodeGenerator';
import ImageUpscalerUI from '@/components/tools/image/ImageUpscalerUI';
import ImageMirror from '@/components/tools/image/ImageMirror';
import ImageRotate from '@/components/tools/image/ImageRotationExpert';
import ImageMasking from '@/components/tools/image/ImageMasking';
import ImageCanvas from '@/components/tools/image/ImageCanvas';
import MetadataCleaner from '@/components/tools/image/MetadataCleaner';
import ImageOverlay from '@/components/tools/image/ImageOverlay';
import ImageGlitcher from '@/components/tools/image/ImageGlitcher';
import ImagePixelator from '@/components/tools/image/ImagePixelator';
import ImageTextAdder from '@/components/tools/image/ImageTextAdder';
import ImageAspectRatio from '@/components/tools/image/ImageAspectRatio';

// Chemistry Tools
import MolarMassProChem from '@/components/tools/chemistry/MolarMassPro';
import AutoBalancer from '@/components/tools/chemistry/AutoBalancer';
import StoichiometrySolver from '@/components/tools/chemistry/StoichiometrySolver';
import IdealGasLaw from '@/components/tools/chemistry/IdealGasLaw';
import MolarityPlus from '@/components/tools/chemistry/MolarityPlus';
import DilutionMaster from '@/components/tools/chemistry/DilutionMaster';
import PHMaster from '@/components/tools/chemistry/PHMaster';
import BufferLogic from '@/components/tools/chemistry/BufferLogic';
import EnthalpySolver from '@/components/tools/chemistry/EnthalpySolver';
import GibbsEnergy from '@/components/tools/chemistry/GibbsEnergy';
import SpecificHeatCalc from '@/components/tools/chemistry/SpecificHeatCalc';
import RateLawCalculator from '@/components/tools/chemistry/RateLawCalculator';
import ArrheniusEquation from '@/components/tools/chemistry/ArrheniusEquation';
import EquilibriumConstant from '@/components/tools/chemistry/EquilibriumConstant';
import SolubilityProduct from '@/components/tools/chemistry/SolubilityProduct';
import NernstPro from '@/components/tools/chemistry/NernstPro';
import FaradaysLaw from '@/components/tools/chemistry/FaradaysLaw';
import HalfLifePro from '@/components/tools/chemistry/HalfLifePro';
import VSEPRPredictor from '@/components/tools/chemistry/VSEPRPredictor';
import FormalChargeSolver from '@/components/tools/chemistry/FormalChargeSolver';
import BondPolarityPro from '@/components/tools/chemistry/BondPolarityPro';
import EmpiricalFinder from '@/components/tools/chemistry/EmpiricalFinder';
import PercentComposition from '@/components/tools/chemistry/PercentComposition';
import LimitingReagent from '@/components/tools/chemistry/LimitingReagent';
import BeerLambertSolver from '@/components/tools/chemistry/BeerLambertSolver';
import BoilingPointPro from '@/components/tools/chemistry/BoilingPointPro';
import FreezingPointPro from '@/components/tools/chemistry/FreezingPointPro';
import DensityMaster from '@/components/tools/chemistry/DensityMaster';
import TempLabPro from '@/components/tools/chemistry/TempLabPro';
import MolecularWeightPro from '@/components/tools/chemistry/MolecularWeightPro';
import OsmoticPressure from '@/components/tools/chemistry/OsmoticPressure';
import GasViscosity from '@/components/tools/chemistry/GasViscosity';

import FileSizeConverter from '@/components/tools/productivity/FileSizeConverter';
import MimeTypeLookup from '@/components/tools/developer/MimeTypeLookup';

import AlgebraSolver from '@/components/tools/mathematics/AlgebraSolver';
import CalculusSolver from '@/components/tools/mathematics/CalculusSolver';
import TrigonometrySolver from '@/components/tools/mathematics/TrigonometrySolver';
import GeometryCalculator from '@/components/tools/mathematics/GeometryCalculator';
import MatrixCalculatorMath from '@/components/tools/mathematics/MatrixCalculator';
import StatsCalculator from '@/components/tools/mathematics/StatsCalculator';
import PartialFractionDecomposer from '@/components/tools/mathematics/PartialFractionDecomposer';
import BinomialExpansionTool from '@/components/tools/mathematics/BinomialExpansionTool';
import SyntheticDivisionCalculator from '@/components/tools/mathematics/SyntheticDivisionCalculator';
import ComplexRootsFinder from '@/components/tools/mathematics/ComplexRootsFinder';
import LogarithmSolver from '@/components/tools/mathematics/LogarithmSolver';
import SequenceSeriesSolver from '@/components/tools/mathematics/SequenceSeriesSolver';
import ConicSectionAnalyzer from '@/components/tools/mathematics/ConicSectionAnalyzer';
import PlaneGeometry3D from '@/components/tools/mathematics/PlaneGeometry3D';
import LimitsEvaluator from '@/components/tools/mathematics/LimitsEvaluator';
import TangentNormalCalculator from '@/components/tools/mathematics/TangentNormalCalculator';
import AreaUnderCurve from '@/components/tools/mathematics/AreaUnderCurve';
import ImproperIntegralSolver from '@/components/tools/mathematics/ImproperIntegralSolver';
import ArcLengthCalculator from '@/components/tools/mathematics/ArcLengthCalculator';
import SurfaceAreaRevolution from '@/components/tools/mathematics/SurfaceAreaRevolution';
import TruthTableGenerator from '@/components/tools/mathematics/TruthTableGenerator';
import SetTheoryVisualizer from '@/components/tools/mathematics/SetTheoryVisualizer';
import NumberBaseOperations from '@/components/tools/mathematics/NumberBaseOperations';
import ModuloArithmeticTool from '@/components/tools/mathematics/ModuloArithmeticTool';
import PrimeFactorizationTree from '@/components/tools/mathematics/PrimeFactorizationTree';
import RegressionAnalysisTool from '@/components/tools/mathematics/RegressionAnalysisTool';
import QuantumLevelSolver from '@/components/tools/education/QuantumLevelSolver';
import ThermoCycleAnalyzer from '@/components/tools/education/ThermoCycleAnalyzer';
import OrbitSimulator from '@/components/tools/education/OrbitSimulator';
import EMWaveCalculator from '@/components/tools/education/EMWaveCalculator';
import NuclearDecaySim from '@/components/tools/education/NuclearDecaySim';

const ToolComponents: Record<string, any> = {
    'mouse-sensitivity-converter': SensitivityConverter,
    'word-counter': WordCounter,
    'password-generator': PasswordGenerator,
    'json-formatter': JSONFormatter,
    'dpi-edpi-calculator': EDPICalculator,
    'click-speed-test': CPSTest,
    'keyboard-latency-tester': KeyboardLatency,
    'aim-trainer': AimTrainer,
    'mouse-polling-rate-checker': PollingRateChecker,
    'cm-360-calculator': CM360Calculator,
    'fps-refresh-rate-calc': FPSCalculator,
    'reaction-time-test': ReactionTest,
    'double-click-test': DoubleClickTest,
    'keyboard-rollover-tester': NKROTester,
    'mouse-acceleration-checker': MouseAcceleration,
    'sensitivity-randomizer': SensitivityRandomizer,
    'aim-consistency-tracker': AimConsistency,
    'scroll-wheel-test': ScrollTest,
    'crosshair-generator': CrosshairGenerator,
    'sensitivity-match-analyzer': SensitivityMatch,
    'input-lag-estimator': InputLagEstimator,
    'motion-blur-test': MotionBlurTest,
    'esports-warmup': EsportsWarmup,
    'jitter-click-test': JitterClick,
    'kohi-click-test': KohiClick,
    'spacebar-counter': SpacebarCounter,
    'butterfly-click-test': ButterflyClick,
    'mouse-movement-tracker': MovementTracker,
    'drag-click-test': DragClickTest,
    'mouse-durability-test': MouseDurability,
    'left-right-click-test': LeftRightClick,
    'mouse-accuracy-trainer': AccuracyTrainer,
    'flick-shot-trainer': FlickTrainer,
    'tracking-trainer': TrackingTrainer,
    'circle-click-test': CircleClick,
    'mouse-trail-visualizer': TrailVisualizer,
    'dpi-analyzer': DPIAnalyzer,
    'typing-speed-test': TypingSpeedTest,
    'key-ghosting-test': KeyGhostingTest,
    'key-rollover-test': KeyRolloverTest,
    'keyboard-heatmap': KeyboardHeatmap,
    'switch-sound-test': SwitchSoundTest,
    'actuator-force-test': ActuatorForceTest,
    'key-wobble-test': KeyWobbleTest,
    'macro-delay-tester': MacroDelayTester,
    'crosshair-overlay': CrosshairOverlay,
    'recoil-pattern-trainer': RecoilTrainer,
    'grenade-calculator': GrenadeCalculator,
    'peekers-advantage-simulator': PeekersAdvantage,
    'sound-direction-test': SoundDirectionTest,
    'meta-tag-generator': MetaTagGenerator,
    'robots-txt-generator': RobotsGenerator,
    'length-converter': LengthConverter,
    'weight-converter': WeightConverter,
    'case-converter': CaseConverter,
    'find-and-replace': FindReplace,
    'reverse-text': ReverseText,
    'whitespace-remover': WhitespaceRemover,
    'text-to-binary': TextBinaryConverter,
    'random-string-generator': RandomStringGen,
    'text-to-slug': TextToSlug,
    'morse-code-translator': MorseCodeTranslator,
    'zalgo-text-generator': ZalgoText,
    'upside-down-text': UpsideDownText,
    'small-text-generator': SmallTextGenerator,
    'html-entity-encoder': HTMLEntityConverter,
    'text-to-hex-converter': TextToHex,
    'strip-html-tags': StripHTML,
    'markdown-to-text': MarkdownToText,
    'line-alphabetizer': LineAlphabetizer,
    'word-frequency-counter': WordFrequency,
    'prefix-suffix-adder': PrefixSuffixAdder,
    'line-numberer': LineNumberer,
    'duplicate-line-finder': DuplicateLineFinder,
    'rot13-cipher': ROT13Cipher,
    'emoji-remover': EmojiRemover,
    'text-to-handwriting': TextToHandwriting,
    'sentence-counter-pro': SentenceCounterPro,
    'text-mirror-tool': TextMirrorTool,
    'list-to-csv-converter': ListToCSV,
    'qr-code-generator': QRCodeGenerator,
    'base64-encoder-decoder': Base64Tool,
    'markdown-previewer': MarkdownPreviewer,
    'lorem-ipsum-generator': LoremIpsumGenerator,
    'text-diff-checker': TextDiffChecker,
    'remove-duplicate-lines': RemoveDuplicateLines,
    'gst-tax-calculator': GSTCalculator,
    'loan-emi-calculator': EMICalculator,
    'age-calculator': AgeCalculator,
    'tip-calculator': TipCalculator,
    'discount-calculator': DiscountCalculator,
    'percentage-calculator': PercentageCalculator,
    'pomodoro-timer': PomodoroTimer,
    'time-zone-converter': TimeZoneConverter,
    'stopwatch': Stopwatch,
    'css-gradient-generator': GradientGenerator,
    'aspect-ratio-calculator': AspectRatioCalculator,
    'image-placeholder-generator': ImagePlaceholder,
    'url-encoder-decoder': URLEncoder,
    'html-minifier': HTMLMinifier,
    'regex-tester': RegexTester,
    'xml-sitemap-generator': SitemapGenerator,
    'schema-markup-generator': SchemaMarkupMaker,
    'og-preview-tool': OGPreview,
    'color-contrast-checker': ColorContrast,
    'glassmorphism-generator': GlassmorphismGen,
    'svg-to-data-uri': SVGToDataURI,
    'compound-interest-calculator': CompoundInterest,
    'salary-tax-calculator': SalaryTaxCalc,
    'image-resizer': ImageResizer,
    'image-cropper': ImageCropper,
    'jpg-to-png': 'converter',
    'png-to-jpg': 'converter',
    'image-compressor': ImageCompressor,
    'csv-to-json': 'converter',
    'json-to-csv': 'converter',
    'xml-to-json': XMLJSONConverter,
    'file-size-converter': FileSizeConverter,
    'mime-type-lookup': MimeTypeLookup,
    'fov-calculator': FOVCalculator,
    'resolution-scaler': ResolutionScaler,
    'gaming-desk-height': GamingDeskHeight,
    'ping-jitter-analyzer': PingJitterAnalyzer,
    'monitor-ppi-calculator': MonitorPPICalculator,
    'sensitivity-monitor-match': MonitorDistanceMatcher,
    'sound-reaction-test': SoundReactionTest,
    'peripheral-vision-test': PeripheralVisionTrainer,
    'target-tracking-pro': TargetTrackingPro,
    'micro-flick-drills': MicroFlickDrills,
    'burst-control-trainer': BurstTimingTrainer,
    'spatial-memory-test': SpatialMemoryBench,
    'click-timing-trainer': ClickTimingTrainer,
    'grid-shot-mini': GridShotMini,
    'pressure-test-reflex': PressureReflexTest,
    'reflex-pattern-match': ReflexPatternMatch,
    'strafe-aiming-sim': StrafeAimingSim,
    'mouse-glide-test': MouseGlideTest,
    'lod-test-guide': LODTestGuide,
    'right-click-speed-test': RightClickSpeedTest,
    'scroll-speed-tester': ScrollSpeedTester,
    'mouse-sensor-jitter-test': MouseSensorJitterTest,
    'mouse-pixel-skipping-check': MousePixelSkippingCheck,
    'cursor-precision-bench': CursorPrecisionBench,
    'mouse-latency-tester': MouseLatencyTester,
    'key-repeat-rate-test': KeyRepeatRateTest,
    'keyboard-debounce-tester': KeyboardDebounceTester,
    'blind-typing-challenge': BlindTypingChallenge,
    'code-typing-speed': CodeTypingSpeed,
    'keyboard-polling-rate-check': KeyboardPollingRateCheck,
    'n-key-rollover-pro': NKRORolloverPro,
    'keyboard-audio-latency': KeyboardAudioLatency,
    'full-keyboard-health-check': FullKeyboardHealthCheck,
    'numpad-speed-test': NumpadSpeedTest,
    'jwt-decoder-pro': JWTDecoderPro,
    'http-status-lookup': HTTPStatusLookup,
    'yaml-json-converter': YAMLJSONConverter,
    'cron-expression-gen': CronExpressionGen,
    'sql-formatter-pro': SQLFormatterPro,
    'js-minifier-tiny': JSMinifierTiny,
    'bash-script-validator': BashScriptValidator,
    'keyword-density-checker': KeywordDensityChecker,
    'heading-hierarchy-analyzer': HeadingHierarchyAnalyzer,
    'google-serp-preview': GoogleSERPPreview,
    'twitter-card-preview': TwitterCardPreview,
    'open-graph-inspector': OpenGraphInspector,
    'backlink-anchor-gen': BacklinkAnchorGen,
    'canonical-url-checker': CanonicalURLChecker,
    'alt-text-accessibility': ALTTextAccessibility,
    'page-load-simulator': PageLoadSimulator,
    'favicon-generator-pro': FaviconGeneratorPro,
    'domain-history-lookup': DomainHistoryLookup,
    'niche-keyword-research': NicheKeywordResearch,
    'internal-link-strategist': InternalLinkStrategist,
    'structured-data-bench': StructuredDataBench,
    'adsense-revenue-calc': AdSenseRevenueCalc,
    'robots-txt-validator': RobotsTxtValidator,

    // Unit Converters
    'temperature-converter': TemperatureConverter,
    'speed-converter': SpeedConverter,
    'volume-converter': VolumeConverter,
    'area-converter': AreaConverter,
    'pressure-converter': PressureConverter,
    'energy-converter': EnergyConverter,
    'power-converter': PowerConverter,
    'angle-converter': AngleConverter,
    'fuel-economy-converter': FuelEconomyConverter,
    'torque-converter': TorqueConverter,
    'force-converter': ForceConverter,
    'number-base-converter': NumberBaseConverter,
    'roman-numeral-converter': RomanNumeralConverter,
    'data-rate-converter': DataRateConverter,
    'digital-storage-pro': DigitalStoragePro,
    'cooking-unit-converter': CookingUnitConverter,
    'frequency-converter': FrequencyConverter,

    // Finance Tools
    'mortgage-calculator': MortgageCalculator,
    'investment-roi-calc': InvestmentROICalc,
    'retirement-planner': RetirementPlanner,
    'savings-goal-calc': SavingsGoalCalc,
    'crypto-price-converter': CryptoPriceConverter,
    'inflation-calculator': InflationCalculator,
    'unit-price-calc': UnitPriceCalc,
    'break-even-calc': BreakEvenCalc,
    'margin-markup-calc': MarginMarkupCalc,
    'credit-card-payoff-calc': CreditCardPayoff,
    'net-worth-calc': NetWorthCalc,
    'dividend-reinvestment-calc': DividendReinvestmentCalc,

    // Daily Tools
    'alarm-clock': AlarmClock,
    'world-clock': WorldClock,
    'daily-planner': DailyPlanner,
    'bmi-calculator': BMICalculator,
    'calorie-calculator': CalorieCalculator,
    'water-intake-tracker': WaterTracker,
    'meditation-timer': MeditationTimer,
    'metronome': Metronome,
    'virtual-ruler': VirtualRuler,
    'dice-roller': DiceRoller,
    'random-number-gen': RandomNumberGen,
    'coin-flipper': CoinFlipper,
    'anagram-solver': AnagramSolver,
    'scrabble-score-calc': ScrabbleScore,
    'quote-generator': QuoteGenerator,
    'wheel-of-fortune': WheelOfFortune,
    'password-strength-tester': PasswordStrengthTester,

    // Design & UI Tools
    'box-shadow-generator': BoxShadowGen,
    'border-radius-customizer': BorderRadiusGen,
    'flexbox-playground': FlexboxPlayground,
    'grid-layout-helper': GridLayoutHelper,
    'pixel-to-rem-converter': PixelToRem,
    'typographic-scale-gen': TypographicScaleGen,
    'golden-ratio-calc': GoldenRatioCalc,
    'color-blindness-sim': ColorBlindSim,
    'mesh-gradient-gen': MeshGradientGen,
    'neuomorphism-gen': NeuomorphismGen,
    'tailwind-color-picker': TailwindColorPicker,
    'svg-path-editor': SVGPathEditor,
    'custom-button-generator': CustomButtonGenerator,
    'glassmorphism-pro': GlassmorphismPro,
    'color-palette-generator': ColorPaletteGenerator,
    'color-shades-generator': ColorShadesGenerator,
    'color-harmony-tool': ColorHarmonyTool,
    'contrast-checker-pro': ContrastCheckerPro,
    'material-design-palette': MaterialDesignPalette,
    'flat-ui-colors': FlatUIColors,
    'css-filter-generator': CSSFilterGenerator,
    'css-text-shadow-generator': CSSTextShadowGen,
    'css-clip-path-generator': CSSClipPathGen,
    'css-animation-keyframes': CSSAnimationGen,
    'css-scrollbar-customizer': CSSScrollbarCustomizer,
    'css-loader-generator': CSSLoaderGenerator,
    'css-tooltip-generator': CSSTooltipGenerator,
    'css-ribbon-generator': CSSRibbonGenerator,
    'css-input-field-stylizer': CSSInputStylizer,
    'css-checkbox-stylizer': CSSCheckboxStylizer,
    'svg-pattern-generator': SVGPatternGenerator,
    'component-mockup-generator': ComponentMockupGen,
    'neumorphism-advanced': NeumorphismGen,
    'card-layout-visualizer': CardLayoutVisualizer,
    'css-buttons-pack': CSSButtonsPack,

    // Image Tools
    'image-filters-pro': ImageFilters,
    'exif-data-viewer': EXIFViewer,
    'svg-to-png-converter': SVGToPNG,
    'webp-to-image-converter': WebPConverter,
    'image-to-base64': ImageToBase64,
    'base64-to-image': Base64ToImage,
    'color-picker-from-image': ColorPickerImg,
    'favicon-generator-utility': FaviconGen,
    'gif-to-frames-extractor': GIFToFrames,
    'image-sprite-sheet-gen': SpriteSheetGen,
    'qr-code-scanner': QRCodeScanner,
    'barcode-generator': BarcodeGenerator,
    'image-upscaler-ui': ImageUpscalerUI,
    'image-mirror-tool': ImageMirror,
    'image-rotation-expert': ImageRotate,
    'image-masking-shapes': ImageMasking,
    'image-canvas-padding': ImageCanvas,
    'image-metadata-cleaner': MetadataCleaner,
    'image-overlay-pro': ImageOverlay,
    'cyberpunk-glitcher': ImageGlitcher,
    'pixel-art-generator': ImagePixelator,
    'photo-text-art': ImageTextAdder,
    'social-aspect-studio': ImageAspectRatio,

    // Education
    'gpa-calculator': GPACalculator,
    'scientific-calculator-pro': ScientificCalculator,
    'citation-generator-pro': CitationGenerator,
    'periodic-table-pro': PeriodicTablePro,
    'math-step-solver': MathStepSolver,
    'flashcard-study-pro': FlashcardMaker,
    'weighted-grade-calc': WeightedGradeCalc,
    'final-exam-calc': FinalGradeRequired,
    'essay-outline-gen': EssayOutlineGen,
    'percentage-gpa-converter': PercentageGPASolver,
    'physics-formula-solver': PhysicsFormulaSolver,
    'chem-equation-balancer': ChemEquationBalancer,
    'study-planner-pro': StudyPlannerPro,
    'bibliography-automator': BibliographyAutomator,
    'vocabulary-builder-pro': VocabularyBuilder,
    'graphing-tool-lite': GraphingToolLite,
    'venn-diagram-maker': VennDiagramMaker,
    'advanced-prime-analyzer': PrimeNumberAnalyzer,
    'matrix-calculator-pro': MatrixCalculator,
    'trig-unit-circle-pro': UnitCircleInteractive,
    'calculus-rule-solver': DerivativeIntegralRules,
    'assignment-kanban-board': AssignmentTracker,
    'standardized-test-conv': SATACTConverter,
    'mind-map-logic': MindMapLite,

    // Advanced Scholar Expansion
    'projectile-simulator': ProjectileSimulator,
    'circuit-solver-pro': CircuitSolverPro,
    'complex-number-pro': ComplexNumberPro,
    'probability-pro': ProbabilityPro,
    'ph-calculator-pro': PHCalculatorPro,
    'gas-law-advanced': GasLawAdvanced,
    'differential-equation-pro': DifferentialEqPro,
    'relativity-dilation': RelativityDilation,
    'reaction-kinetics': ReactionKineticsPro,
    'laplace-solver-pro': LaplaceSolverPro,
    'vector-calc-pro': VectorCalcPro,
    'titration-curve-sim': TitrationCurveSim,
    'quantum-level-solver': QuantumLevelSolver,
    'thermo-cycle-analyzer': ThermoCycleAnalyzer,
    'orbit-simulator-pro': OrbitSimulator,
    'em-wave-calculator': EMWaveCalculator,
    'nuclear-decay-sim': NuclearDecaySim,

    // Mathematics Tools
    'algebra-solver': AlgebraSolver,
    'calculus-solver': CalculusSolver,
    'trigonometry-solver': TrigonometrySolver,
    'coordinate-geometry': GeometryCalculator,
    'matrix-determinant': MatrixCalculatorMath,
    'cramers-rule-solver': MatrixCalculatorMath,
    'probability-statistics': StatsCalculator,
    'partial-fraction-decomposer': PartialFractionDecomposer,
    'binomial-expansion-tool': BinomialExpansionTool,
    'synthetic-division-calculator': SyntheticDivisionCalculator,
    'complex-roots-finder': ComplexRootsFinder,
    'logarithm-solver': LogarithmSolver,
    'sequence-series-solver': SequenceSeriesSolver,
    'conic-section-analyzer': ConicSectionAnalyzer,
    'plane-geometry-3d': PlaneGeometry3D,
    'limits-evaluator': LimitsEvaluator,
    'tangent-normal-calculator': TangentNormalCalculator,
    'area-under-curve': AreaUnderCurve,
    'improper-integral-solver': ImproperIntegralSolver,
    'arc-length-calculator': ArcLengthCalculator,
    'surface-area-revolution': SurfaceAreaRevolution,
    'truth-table-generator': TruthTableGenerator,
    'set-theory-visualizer': SetTheoryVisualizer,
    'number-base-operations': NumberBaseOperations,
    'modulo-arithmetic-tool': ModuloArithmeticTool,
    'prime-factorization-tree': PrimeFactorizationTree,
    'regression-analysis-tool': RegressionAnalysisTool,

    // Chemistry Tools
    'molar-mass-pro': MolarMassProChem,
    'equation-balancer': AutoBalancer,
    'stoichiometry-solver': StoichiometrySolver,
    'ideal-gas-law': IdealGasLaw,
    'molarity-calculator': MolarityPlus,
    'dilution-calculator': DilutionMaster,
    'ph-poh-calculator': PHMaster,
    'buffer-calculator': BufferLogic,
    'enthalpy-calculator': EnthalpySolver,
    'gibbs-free-energy': GibbsEnergy,
    'specific-heat-calc': SpecificHeatCalc,
    'rate-law-calculator': RateLawCalculator,
    'arrhenius-equation': ArrheniusEquation,
    'equilibrium-constant': EquilibriumConstant,
    'solubility-product': SolubilityProduct,
    'nernst-equation': NernstPro,
    'faradays-law': FaradaysLaw,
    'half-life-calculator': HalfLifePro,
    'vsepr-predictor': VSEPRPredictor,
    'formal-charge-calc': FormalChargeSolver,
    'electronegativity-diff': BondPolarityPro,
    'empirical-formula': EmpiricalFinder,
    'percentage-composition': PercentComposition,
    'limiting-reagent': LimitingReagent,
    'beer-lambert-law': BeerLambertSolver,
    'boiling-point-elevation': BoilingPointPro,
    'freezing-point-depression': FreezingPointPro,
    'density-calculator': DensityMaster,
    'celsius-kelvin-conv': TempLabPro,
    'molecular-weight-calc': MolecularWeightPro,
    'osmotic-pressure': OsmoticPressure,
    'gas-viscosity-calc': GasViscosity,
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) return { title: 'Tool Not Found' };

    const title = `${tool.title} | Free Online ${tool.category} Tool`;
    const description = `${tool.description} Use our free ${tool.title.toLowerCase()} to improve your ${tool.category.toLowerCase()} workflow. No signup required.`;

    return {
        title,
        description,
        keywords: `${tool.title}, ${tool.category}, Assets Tools Hub, ${tool.keywords?.join(', ')}`,
        alternates: {
            canonical: `https://www.assetstoolshub.com/tools/${slug}`,
        },
        openGraph: {
            title,
            description,
            type: 'website',
            url: `https://www.assetstoolshub.com/tools/${slug}`,
            siteName: 'Assets Tools Hub',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        }
    };
}

export default async function ToolPage({ params }: PageProps) {
    const { slug } = await params;
    const tool = getToolBySlug(slug);

    if (!tool) {
        notFound();
    }

    let Component = ToolComponents[slug];

    // Handle special cases for functional components passed as objects
    if (slug === 'jpg-to-png') Component = () => <ImageConverter mode="jpg-to-png" />;
    if (slug === 'png-to-jpg') Component = () => <ImageConverter mode="png-to-jpg" />;
    if (slug === 'csv-to-json') Component = () => <CSVJSONConverter mode="csv-to-json" />;
    if (slug === 'json-to-csv') Component = () => <CSVJSONConverter mode="json-to-csv" />;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Online Tools",
                                "item": "https://www.assetstoolshub.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": tool.category,
                                "item": `https://www.assetstoolshub.com/category/${slugifyCategory(tool.category)}`
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": tool.title,
                                "item": `https://www.assetstoolshub.com/tools/${tool.slug}`
                            }
                        ]
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": tool.title,
                        "description": tool.description,
                        "applicationCategory": tool.category,
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        }
                    })
                }}
            />
            <ToolPageClient tool={tool} slug={slug}>
                {Component && <Component />}
            </ToolPageClient>
        </>
    );
}
