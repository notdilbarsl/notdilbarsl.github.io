import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';

const responseTimeTrend = new Trend('response_time');

export const options = {
  stages: [
    { duration: '30s', target: 1000 },
    { duration: '1m', target: 10000 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const gamePageRes = http.get('https://notdilbarsl.github.io/');
  check(gamePageRes, { 'Game Page status is 200': (r) => r.status === 200 });
  responseTimeTrend.add(gamePageRes.timings.duration);
}
