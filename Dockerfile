FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG BACKEND_API_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID

ENV BACKEND_API_URL=$BACKEND_API_URL
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

RUN npm prune --omit=dev


FROM node:22-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npm", "start"]