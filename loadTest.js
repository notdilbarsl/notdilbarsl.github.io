import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';

let responseTimeTrend = new Trend('response_time');

export let options = {
  stages: [
    { duration: '30s', target: 300 },
    { duration: '1m', target: 3000 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  let gamePageRes = http.get('https://notdilbarsl.github.io/');
  check(gamePageRes, { 'Game Page status is 200': (r) => r.status === 200 });
  responseTimeTrend.add(gamePageRes.timings.duration);
}
