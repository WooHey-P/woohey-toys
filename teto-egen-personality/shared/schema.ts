import { pgTable, text, serial, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  gender: text("gender").notNull(),
  answers: json("answers").notNull(),
  personalityType: text("personality_type").notNull(),
  tetoPercentage: integer("teto_percentage").notNull(),
  egenPercentage: integer("egen_percentage").notNull(),
  language: text("language").notNull().default("ko"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const questionImages = pgTable("question_images", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").notNull(),
  gender: text("gender"), // null for neutral images
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTestResultSchema = createInsertSchema(testResults).omit({
  id: true,
  createdAt: true,
});

export const insertQuestionImageSchema = createInsertSchema(questionImages).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
export type TestResult = typeof testResults.$inferSelect;
export type InsertQuestionImage = z.infer<typeof insertQuestionImageSchema>;
export type QuestionImage = typeof questionImages.$inferSelect;

export const questionAnswerSchema = z.object({
  questionId: z.number(),
  optionIndex: z.number(),
  type: z.enum(["teto", "egen", "neutral"]),
  value: z.number(),
});

export const testSubmissionSchema = z.object({
  sessionId: z.string(),
  gender: z.enum(["male", "female"]),
  answers: z.array(questionAnswerSchema),
  language: z.string().default("ko"),
});

export type QuestionAnswer = z.infer<typeof questionAnswerSchema>;
export type TestSubmission = z.infer<typeof testSubmissionSchema>;
