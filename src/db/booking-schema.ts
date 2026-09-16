import { user } from './user-schema'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const services = sqliteTable('services', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  durationMinutes: integer('duration_minutes').notNull(),
  price: integer('price').notNull(),
  colorId: text('color_id').default('5'), 
});

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id),
  serviceId: text('service_id').notNull().references(() => services.id),
  startTime: integer('start_time', { mode: 'timestamp' }).notNull(),
  endTime: integer('end_time', { mode: 'timestamp' }).notNull(),
  status: text('status').notNull().default('pending'),
  googleEventId: text('google_event_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});