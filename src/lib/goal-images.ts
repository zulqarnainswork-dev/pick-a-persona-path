import type { Gender, GoalId } from "./goals";
import male_abs from "@/assets/male-abs.jpg";
import male_weight_loss from "@/assets/male-weight-loss.jpg";
import male_weight_gain from "@/assets/male-weight-gain.jpg";
import male_strength from "@/assets/male-strength.jpg";
import male_keep_fit from "@/assets/male-keep-fit.jpg";
import male_chest from "@/assets/male-chest.jpg";
import male_flexibility from "@/assets/male-flexibility.jpg";
import male_hiit from "@/assets/male-hiit.jpg";
import male_posture from "@/assets/male-posture.jpg";
import male_v_taper from "@/assets/male-v-taper.jpg";
import male_kegel from "@/assets/male-kegel.jpg";
import female_abs from "@/assets/female-abs.jpg";
import female_weight_loss from "@/assets/female-weight-loss.jpg";
import female_weight_gain from "@/assets/female-weight-gain.jpg";
import female_strength from "@/assets/female-strength.jpg";
import female_keep_fit from "@/assets/female-keep-fit.jpg";
import female_chest from "@/assets/female-chest.jpg";
import female_flexibility from "@/assets/female-flexibility.jpg";
import female_hiit from "@/assets/female-hiit.jpg";
import female_posture from "@/assets/female-posture.jpg";
import female_v_taper from "@/assets/female-v-taper.jpg";
import female_kegel from "@/assets/female-kegel.jpg";

export const goalImages: Record<Gender, Record<GoalId, string>> = {
  male: {
    "abs": male_abs,
    "weight-loss": male_weight_loss,
    "weight-gain": male_weight_gain,
    "strength": male_strength,
    "keep-fit": male_keep_fit,
    "chest": male_chest,
    "flexibility": male_flexibility,
    "hiit": male_hiit,
    "posture": male_posture,
    "v-taper": male_v_taper,
    "kegel": male_kegel,
  },
  female: {
    "abs": female_abs,
    "weight-loss": female_weight_loss,
    "weight-gain": female_weight_gain,
    "strength": female_strength,
    "keep-fit": female_keep_fit,
    "chest": female_chest,
    "flexibility": female_flexibility,
    "hiit": female_hiit,
    "posture": female_posture,
    "v-taper": female_v_taper,
    "kegel": female_kegel,
  },
};
