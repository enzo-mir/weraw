import { z } from "zod";

export const urlSchema = z.string().url({ message: "Invalid url" }).startsWith("https://photos.weraw/", { message: "Invalid url" });
