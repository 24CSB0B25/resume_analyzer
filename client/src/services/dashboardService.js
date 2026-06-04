import { getHistory } from "./historyService";

export const getDashboardStats =
    async () => {

    const analyses =
        await getHistory();

    const total =
        analyses.length;

    const averageATS =
        total
            ? Math.round(
                analyses.reduce(
                (sum, item) =>
                    sum + item.atsScore,
                0
                ) / total
            )
            : 0;

    const highestATS =
        total
            ? Math.max(
                ...analyses.map(
                a => a.atsScore
                )
            )
            : 0;

    const latestATS =
      total
        ? analyses[0].atsScore
        : 0;

    return {
        analyses,
        total,
        averageATS,
        highestATS,
        latestATS,
    };
};