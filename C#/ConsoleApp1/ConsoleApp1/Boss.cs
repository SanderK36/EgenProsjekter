using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Security;
using System.Text;
using System.Threading.Tasks;

namespace WoW
{
    internal class Boss
    {
        public int BossHp { get; set; }
        public int BossMaxHp { get; set; }
        public int BossAttackPower { get; set; }
        public string BossName { get; set; }
        public int BossLevel { get; set; }

        public Boss(int bossHp, int bossAttackPower, string bossName, int bossLevel)
        {
            BossHp = bossHp;
            BossAttackPower = bossAttackPower;
            BossName = bossName;
            BossLevel = bossLevel;
            BossMaxHp = bossHp;
        }
    }
}
