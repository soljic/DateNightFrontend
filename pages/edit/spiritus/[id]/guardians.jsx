import { useState } from "react";

import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Alert } from "@/components/Status";
import { DeleteSpiritusModal } from "@/components/forms/DeleteSpiritusModal";
import { EditorLayout } from "@/components/forms/Layout";
import FullWidthLayout from "@/components/layout/LayoutV2";
import { Guardian } from "@/components/settings/EditGuardians";
import {
  AddGuardianModal,
  DeleteGuardianModal,
} from "@/components/settings/EditGuardians";

import { GetSpiritusById } from "@/service/http/spiritus";

export default function EditSpiritusGuardians({
  spiritus,
  loggedInUserGuardianCode,
}) {
  const { t } = useTranslation("common");
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [isDeleteSpiritusModalOpen, setIsDeleteSpiritusModalOpen] =
    useState(false);

  const [isOpenDeleteGuardianModal, setIsOpenDeleteGuardianModal] =
    useState(false);

  const [isOpenAddGuardianModal, setIsOpenAddGuardianModal] = useState(false);

  const [currentGuardians, setCurrentGuardians] = useState([...spiritus.users]);

  const [guardianToDelete, setGuardianToDelete] = useState(null); // useState(currentGuardians[0]);

  const onDelete = (deleteIdx) => {
    setGuardianToDelete(currentGuardians[deleteIdx]);
    setIsOpenDeleteGuardianModal(true);
  };

  const clearToast = () => {
    setToastOpen(false);
    setToastMessage("");
    setIsSuccess(false);
  };

  function onSuccess() {
    setIsSuccess(true);
    setToastMessage(t("message_save_success"));
    setToastOpen(true);
  }

  function onError(message) {
    setIsSuccess(false);
    setToastMessage(message);
    setToastOpen(true);
  }

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("edit_spiritus_meta_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("edit_spiritus_meta_desc")} />
      </Head>

      {/* Modals */}
      {isDeleteSpiritusModalOpen && (
        <DeleteSpiritusModal
          deleteId={spiritus.id}
          isOpen={isDeleteSpiritusModalOpen}
          closeModal={() => {
            setIsDeleteSpiritusModalOpen(false);
          }}
        />
      )}
      {isOpenAddGuardianModal && (
        <AddGuardianModal
          spiritusId={spiritus.id}
          spiritusFullName={`${spiritus.name} ${spiritus.surname}`}
          isOpen={isOpenAddGuardianModal}
          closeModal={() => setIsOpenAddGuardianModal(false)}
        />
      )}
      {isOpenDeleteGuardianModal ? (
        <DeleteGuardianModal
          spiritusId={spiritus.id}
          spiritusFullName={`${spiritus.name} ${spiritus.surname}`}
          guardianFullName={`${guardianToDelete.name} ${guardianToDelete.surname}`}
          guardianId={guardianToDelete.id}
          isOpen={isOpenDeleteGuardianModal}
          closeModal={() => setIsOpenDeleteGuardianModal(false)}
        />
      ) : null}
      <div className="relative mb-64 min-h-screen">
        {toastOpen && (
          <div className="sticky right-0 top-8 z-50 mb-5">
            <div className="flex justify-end">
              <Alert
                isSuccess={isSuccess}
                message={toastMessage}
                onClick={clearToast}
              />
            </div>
          </div>
        )}
        <EditorLayout
          menuId={3}
          spiritusSlug={spiritus.slug}
          name={spiritus.name}
          surname={spiritus.surname}
          birth={spiritus.birth}
          death={spiritus.death}
          spiritusId={spiritus.id}
          onDelete={() => setIsDeleteSpiritusModalOpen(true)}
        >
          <div className="mx-5 flex flex-col ">
            <div className="mb-4 flex justify-between">
              <div>
                <h1 className="font-bold text-2xl">{t("guardians_title")}</h1>
                <p className="non-italic font-medium leading-4 text-[#999795] text-sm">
                  {t("guardians_subtitle")}
                </p>
              </div>
              <button
                onClick={() => setIsOpenAddGuardianModal(true)}
                className="flex items-center justify-center rounded-sp-14 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn p-2 text-sp-white dark:from-sp-dark-fawn dark:to-sp-fawn"
              >
                {t("add_guardian_button_text")}
              </button>
            </div>
            <div className="mt-4 flex flex-col divide-y-2 divide-sp-day-200/90 overflow-hidden rounded-sp-14 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:divide-sp-black dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
              {currentGuardians?.map((guardian, idx) => (
                <Guardian
                  key={`guardian-${idx}`}
                  idx={idx}
                  guardian={guardian}
                  loggedInUserGuardianCode={loggedInUserGuardianCode}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        </EditorLayout>
      </div>
    </FullWidthLayout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // NOTE: this could be problematic
  let loggedInUserGuardianCode = session.user.code || "";

  try {
    const { data: spiritus } = await GetSpiritusById(
      id,
      session.user.accessToken,
      context.locale
    );

    if (!spiritus || !spiritus?.users) {
      throw "missing spiritus data";
    }

    for (const su of spiritus.users) {
      if (su.email === session.user.email && su.code === session.user.code) {
        return {
          props: {
            loggedInUserGuardianCode,
            spiritus,
            ...(await serverSideTranslations(context.locale, [
              "common",
              "settings",
              "auth",
            ])),
          },
        };
      }
    }

    // user does not have access - redirect to previous page
    return {
      redirect: {
        destination: context.req.headers.referer || "/",
        permanent: false,
      },
    };
  } catch {
    // redirect to home in case of err
    // known errs: 404 Not Found Spiritus
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
